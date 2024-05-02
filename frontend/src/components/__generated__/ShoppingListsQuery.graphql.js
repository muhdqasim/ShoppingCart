/**
 * @generated SignedSource<<707175d80b024f3d07a8db816836d2c0>>
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
    "name": "ShoppingListsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShoppingListsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "04cd729858fb30b05fb7e51fc74eb0ec",
    "id": null,
    "metadata": {},
    "name": "ShoppingListsQuery",
    "operationKind": "query",
    "text": "query ShoppingListsQuery {\n  shoppingLists {\n    id\n    name\n  }\n}\n"
  }
};
})();

node.hash = "50d802b019d7744242f76386ba4ff514";

module.exports = node;
