/**
 * @generated SignedSource<<13b07bdadb4b3ce69837396c3d85c3cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "items"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "items",
        "variableName": "items"
      }
    ],
    "kind": "ScalarField",
    "name": "addItemsToCart",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingListAddItemsToCartMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShoppingListAddItemsToCartMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a3056a57e4fb05d1527f3044a4dbc7d7",
    "id": null,
    "metadata": {},
    "name": "ShoppingListAddItemsToCartMutation",
    "operationKind": "mutation",
    "text": "mutation ShoppingListAddItemsToCartMutation(\n  $items: [CartItemInput]!\n) {\n  addItemsToCart(items: $items)\n}\n"
  }
};
})();

node.hash = "320246501f2f23438ca1232a9afe9844";

module.exports = node;
