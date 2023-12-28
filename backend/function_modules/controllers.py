from flask import jsonify
def to_jsonify(id_field, collections, laptime,  name_id=str(), search_id=str()):
    """
    A function that returns a list of dictionaries from the track_now database

    args:
    id_field: An id related to the collection
    collection: Specified MongoDb collection to be queried
    name_id: The field name used to search for documents in the MongoDB collection.
              Defaults to an empty string if not provided.
    search_id: Determines how the query should be processed
    """
  
    find_id = collections.find({name_id: id_field}, {'_id': False})

  
    id_objects = [laptime(**find_ids) for find_ids in find_id]
    print(name_id)
    if search_id == 'car_id':
        find_id_dicts = [laptimes.only_cars() for laptimes in id_objects]
        
        return find_id_dicts

    elif search_id == 'track_id':
        find_id_dicts = [laptimes.only_tracks() for laptimes in id_objects]

        return find_id_dicts

    else:
        find_id_dicts = [laptimes.only_drivers() for laptimes in id_objects]
        return find_id_dicts
    
def to_jsonify_one(id_field, collection, name_id=str(), message="Entry"):
    """
    Returns a JSON representaion of a document

    args:
    id_field: The specific field value being searched for
    collection: Specified MongoDb collection to be queried
    name_id: A field key used to search for the value
    message: JSON message returned if query is found
    """
    find_id = collection.find_one({name_id: id_field}, {'_id': False})
    if find_id is not None:
        # Extract data from the cursor
        find_id = dict(find_id)
        print(find_id)
        return jsonify(find_id)
    else:
        return jsonify({"message": "{} not found".format(message)}), 404