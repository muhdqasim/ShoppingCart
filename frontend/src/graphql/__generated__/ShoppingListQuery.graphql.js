/**
 * @generated SignedSource<<56f106a307fc0c6eec335e72eef144e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ShoppingList",
    "kind": "LinkedField",
    "name": "shoppingLists",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShoppingListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c25d69ad6456764fb058b239c72cd5e9",
    "id": null,
    "metadata": {},
    "name": "ShoppingListQuery",
    "operationKind": "query",
    "text": "query ShoppingListQuery {\n  shoppingLists {\n    id\n    name\n  }\n}\n"
  }
};
})();

node.hash = "40a7faaf0470e70604bd4eb5f1fba274";

module.exports = node;
