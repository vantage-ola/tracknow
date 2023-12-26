from flask import jsonify

def to_jsonify(collection, id_field, data, message='Entry'):
    """
    A function that returns a JSON representation of data from a collection
     args:
     collection: designated collection to retrieve data from database
     id_field: A field that is a unique identifier of each documents in database
     data: A list of dictionaries containing data to be retrieved
     message: Optional parameter

     Returns:
        - Returns a JSON representation of the retrieved data using Flask's jsonify function.
    - If data is empty:
        - Returns a JSON response with a message indicating that the specified entry was not found, 
          along with a 404 status code.
      """
    if data:
        # Extract the values directly from the 'data' list
        list_of_data_id = [str(datas.get(id_field, '')) for datas in data]  # Use an empty string as the default value
        print("List of IDs:", list_of_data_id)  # Debugging print
        data_items = collection.find({id_field: {'$in': list_of_data_id}}, {'_id': False})
        data_dicts = [data_item for data_item in data_items]
        print("Retrieved Data:", data_dicts)  # Debugging print

        return jsonify(data_dicts)
    else:
        return jsonify({"message": "{} not found"}.format(message)), 404
