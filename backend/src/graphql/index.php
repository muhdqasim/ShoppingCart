<?php

require __DIR__ . '/../../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Selective\BasePath\BasePathMiddleware;

use GraphQL\GraphQL;
use GraphQL\Utils\BuildSchema;

require_once __DIR__ . '/../classes/Database.php';

$db = new Database();
$conn = $db->getConnection();

$app = AppFactory::create();

// Set the base path to run the app in a subdirectory.
$app->add(new BasePathMiddleware($app, '/graphql'));

$app->addErrorMiddleware(true, true, true);


//Resolver functions
function resolveShoppingList($root, $args) {
    global $conn;

    $shoppingListId = $args['id'];
    $query = "SELECT * FROM ShoppingList WHERE id = :id";
    $statement = $conn->prepare($query);
    $statement->execute(['id' => $shoppingListId]);
    $shoppingListData = $statement->fetch();

    return $shoppingListData;
}

/**
 * Resolve items based on search value
 */
function resolveSearchItems($root, $args) {
    global $conn;

    $itemName = $args['searchValue'];
    $limitCheck = $args['limit'] ?? 20; 
    $offsetCheck = $args['offset'] ?? 0;

    if($itemName == null || $itemName == "") {
        $countQuery = "SELECT COUNT(*) as total FROM Item";
        $countStatement = $conn->prepare($countQuery);

        $queryStatement = "SELECT * FROM Item LIMIT :limitCheck OFFSET :offsetCheck";
        $statement = $conn->prepare($queryStatement);
        $statement->bindParam(':limitCheck', $limitCheck, PDO::PARAM_INT);
        $statement->bindParam(':offsetCheck', $offsetCheck, PDO::PARAM_INT);
    }
    else {
        $itemName = strip_tags($itemName);
        $itemName = htmlspecialchars($itemName, ENT_QUOTES, 'UTF-8');    
        $itemName = "%" . $itemName . "%";

        $countQuery = "SELECT COUNT(*) as total FROM Item WHERE name LIKE :itemName OR description LIKE :itemName";
        $countStatement = $conn->prepare($countQuery);
        $countStatement->bindParam(':itemName', $itemName);

        $queryStatement = "SELECT * FROM Item WHERE name LIKE :itemName OR description LIKE :itemName LIMIT :limitCheck OFFSET :offsetCheck";
        $statement = $conn->prepare($queryStatement);
        $statement->bindParam(':itemName', $itemName);
        $statement->bindParam(':limitCheck', $limitCheck, PDO::PARAM_INT);
        $statement->bindParam(':offsetCheck', $offsetCheck, PDO::PARAM_INT);
    }

    // Query to get the total count of items

    $countStatement->execute();
    $totalCount = $countStatement->fetch(PDO::FETCH_ASSOC)['total'];

    // Query to get the items with pagination
    $statement->execute();
    $shoppingListData = $statement->fetchAll(PDO::FETCH_ASSOC);

    return ['items' => $shoppingListData, 'totalCount' => $totalCount];
}

/**
 * Resolve all items
 */
function resolveItems($root, $args) {
    global $conn;

    $query = "SELECT * FROM Item LIMIT 20";
    $statement = $conn->prepare($query);
    $statement->execute();
    $shoppingListData = $statement->fetchAll(PDO::FETCH_ASSOC);

    return $shoppingListData;
}

/**
 * Resolve all shopping lists
 */
function resolveShoppingLists($root, $args) {
    global $conn;

    $statement = $conn->prepare("SELECT * FROM ShoppingList");
    $statement->execute();
    $shoppingListsData = $statement->fetchAll();

    return $shoppingListsData;
}

/**
 * Create a new shopping list
 */
function createShoppingList($root, $args) {
    global $conn;

    $input = $args['input'];
    $name = $input['name'];
    $status = $input['status'];

    $statement = $conn->prepare("INSERT INTO ShoppingList (name, status) VALUES (:name, :status)");
    $statement->execute(['name' => $name, 'status' => $status]);
    $newShoppingListId = $conn->lastInsertId();

    $newShoppingList = resolveShoppingList(null, ['id' => $newShoppingListId]);

    return $newShoppingList;
}

/**
 * Update a shopping list
 */
function updateShoppingList($root, $args) {
    global $conn;

    $shoppingListId = $args['id'];
    $input = $args['input'];
    $name = $input['name'];
    $status = $input['status'];

    $statement = $conn->prepare("UPDATE ShoppingList SET name = :name, status = :status WHERE id = :id");
    $statement->execute(['name' => $name, 'status' => $status, 'id' => $shoppingListId]);

    $updatedShoppingList = resolveShoppingList(null, ['id' => $shoppingListId]);

    return $updatedShoppingList;
}

/**
 * Delete a shopping list
 */
function deleteShoppingList($root, $args) {
    global $conn;

    $shoppingListId = $args['id'];

    $statement = $conn->prepare("DELETE FROM ShoppingList WHERE id = :id");
    $statement->execute(['id' => $shoppingListId]);

    return $statement->fetch();
}

/**
 * Add items to the shopping list
 
 */
function addItemsToCart($root, $args) {
    global $conn;

    $items = $args['items'];

    // Retrieve all item IDs in the ShoppingListItem table
    $stmt = $conn->prepare("SELECT itemId FROM ShoppingListItem WHERE listId = :listId");
    $stmt->execute(['listId' => 1]);
    $existingItemIds = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    $itemIds = array_map(function($item) {
        return $item['id'];
    }, $items);

    // Filter out the existing item IDs from the input array
    $newItems = array_diff($itemIds, $existingItemIds);

    if (!empty($newItems)) {
        // Prepare the values for the SQL query
        $values = [];
        $newItems = array_filter($items, function($item) use ($newItems) {
            return in_array($item['id'], $newItems);
        });
        foreach ($newItems as $item) {
            $values[] = "(1, {$item['id']}, {$item['quantity']})";
        }

        $valuesString = implode(',', $values);

        // Insert the new item IDs into the ShoppingListItem table
        $query = "INSERT INTO ShoppingListItem (listId, itemId, quantity) VALUES $valuesString";
        $conn->exec($query);
    }

    // Filter out the ids to be deleted
    $deleteItemIds = array_diff($existingItemIds, $itemIds);
    
    if (!empty($deleteItemIds)) {
        $valuesString = implode(',', $deleteItemIds);
        $query = "DELETE FROM ShoppingListItem WHERE listId = 1 AND itemId IN ($valuesString)";
        $conn->exec($query);
    }

    return true;
}

// Resolver functions
$resolvers = [
    'Query' => [
        'shoppingList' => 'resolveShoppingList',
        'shoppingLists' => 'resolveShoppingLists',
        'items' => 'resolveItems',
        'searchItems' => 'resolveSearchItems',
    ],
    'Mutation' => [
        'createShoppingList' => 'createShoppingList',
        'updateShoppingList' => 'updateShoppingList',
        'deleteShoppingList' => 'deleteShoppingList',
        'addItemsToCart' => 'addItemsToCart',
    ],
];

// Load the schema from a .graphql file
$schemaFileContent = file_get_contents(__DIR__ . '/schema.graphql');

$typeConfigDecorator = function($typeConfig, $typeDefinitionNode) use($resolvers) {
    $name = $typeConfig['name'];
    if (isset($resolvers[$name])) {
        $typeConfig['resolveField'] = function($value, $args, $context, $info) use ($resolvers) {
            return $resolvers[$info->parentType->name][$info->fieldName]($value, $args);
        };
    }
    return $typeConfig;
};

$schema = BuildSchema::build($schemaFileContent, $typeConfigDecorator);

$app->get('/', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("Server is running");
    return $response;
});

/**
 * GraphQL endpoint
 */
$app->post('/', function (Request $request, Response $response, array $args) use ($schema) {
    $input = $request->getParsedBody();
	$query = $input['query'];
	$variableValues = isset($input['variables']) ? $input['variables'] : null;

	$result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
	$output = $result->toArray();

	$response->getBody()->write(json_encode($output));
	return $response->withHeader('Content-Type', 'application/json');
});

$app->run();