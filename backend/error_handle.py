from flask import jsonify

def handle_bad_request(error):
    return jsonify({'error': 'Bad Request', 'message': str(error)}), 400

def handle_unauthorized(error):
    return jsonify({'error': 'Unauthorized', 'message': str(error)}), 401

def handle_forbidden(error):
    return jsonify({'error': 'Forbidden', 'message': str(error)}), 403

def handle_not_found(error):
    return jsonify({'error': 'Not Found', 'message': str(error)}), 404

def handle_method_not_allowed(error):
    return jsonify({'error': 'Method Not Allowed', 'message': str(error)}), 405

def handle_internal_server_error(error):
    return jsonify({'error': 'Internal Server Error', 'message': str(error)}), 500

def handle_service_unavailable(error):
    return jsonify({'error': 'Service Unavailable', 'message': str(error)}), 503
