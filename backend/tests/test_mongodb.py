
def test_mongobd(test_mongo):
    response = test_mongo.admin.command('ping')
    assert response['ok'] == 1