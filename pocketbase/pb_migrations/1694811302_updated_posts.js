/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zpo5vme7jbab3q6")

  // remove
  collection.schema.removeField("fkfvrmjn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jgy5svgz",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zpo5vme7jbab3q6")

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

  // remove
  collection.schema.removeField("jgy5svgz")

  return dao.saveCollection(collection)
})
