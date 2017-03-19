function LokiClient(collectionName, endpoint) {
    this.collectionName = collectionName;
    this.endpoint = endpoint;
}

LokiClient.prototype.find = function(queryObject, callback) {
    var params = {
        collectionName: this.collectionName,
        queryObject: JSON.stringify(queryObject)
    };

    $.ajax({
        url: this.endpoint + "/find",
        type: "POST",
        data: params,
        cache: false,
        dataType: 'json',
        success: function (result) {
            if (typeof result === "string") {
                callback(new Error(result));
            }
            callback(result);
        },
        error: function (reqest, status, error) {
            callback(new Error(request.responseText));
        }
    });
};

LokiClient.prototype.findResultset = function(queryObject, callback) {
    this.find(queryObject, function(results) {
        var coll = new loki.Collection();
        if (!(results instanceof Error)) {
            // need to patch lokijs to allow ephemeral mode where
            // we can insert docs which already have $loki & meta.
            // for now since we do not have indices or changes, 
            // we will just set data[]
            coll.data = results;
        }

        callback(coll.chain());
    });
};

LokiClient.prototype.insert = function(doc, callback) {
    var params = {
        collectionName: this.collectionName,
        document: JSON.stringify(doc)
    }

    $.ajax({
        url: this.endpoint + "/insert",
        type: "POST",
        data: params,
        cache: false,
        dataType: 'json',
        success: function (result) {
            if (typeof result === "string") {
                callback(new Error(result));
                return;
            }

            if (typeof result === "object") {
                callback(result);
                return;
            }

            callback(result);
        },
        error: function (reqest, status, error) {
            callback(new Error(request.responseText));
        }
    });
};

LokiClient.prototype.update = function(doc, callback) {
    var params = {
        collectionName: this.collectionName,
        document: JSON.stringify(doc)
    }

    $.ajax({
        url: this.endpoint + "/update",
        type: "POST",
        data: params,
        cache: false,
        dataType: 'json',
        success: function (result) {
            if (typeof result === "string") {
                callback(new Error(result));
                return;
            }

            if (typeof result === "object") {
                callback(result);
                return;
            }
            
            callback(result);
        },
        error: function (reqest, status, error) {
            callback(new Error(request.responseText));
        }
    });
};

LokiClient.prototype.remove = function(lokiId, callback) {
    var params = {
        collectionName: this.collectionName,
        $loki: lokiId.toString()
    }

    $.ajax({
        url: this.endpoint + "/remove",
        type: "POST",
        data: params,
        cache: false,
        dataType: 'json',
        success: function (result) {
            if (typeof result === "string") {
                callback(new Error(result));
            }
            callback(result);
        },
        error: function (reqest, status, error) {
            callback(new Error(request.responseText));
        }
    });
};
