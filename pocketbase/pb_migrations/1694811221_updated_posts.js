/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zpo5vme7jbab3q6")

  // remove
  collection.schema.removeField("13yfxtm4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fkfvrmjn",
    "name": "content",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zpo5vme7jbab3q6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "13yfxtm4",
    "name": "content",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("fkfvrmjn")

  return dao.saveCollection(collection)
})
