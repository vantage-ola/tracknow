from flask import jsonify

def to_jsonify(collection, id_field, data, message='Entry'):
    if data:  # Assuming data is a list of dictionaries
        list_of_data_id = [str(datas.get(id_field, '')) for datas in data]  # Use an empty string as the default value
        print("List of IDs:", list_of_data_id)  # Debugging print
        data_items = collection.find({id_field: {'$in': list_of_data_id}}, {'_id': False})
        data_dicts = [data_item for data_item in data_items]
        print("Retrieved Data:", data_dicts)  # Debugging print

        return jsonify(data_dicts)
    else:
        return jsonify({"message": "{} not found".format(message)}), 404
