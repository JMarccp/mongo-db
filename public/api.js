var getButton = document.getElementById('sort_docs');
getButton.addEventListener('submit', getLower);

function getLower(event) {
    event.preventDefault();
    var documentVal = event.target.documentIdsort.value;
    const URL = `/docs/${1}`+`${documentVal}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
                document.getElementById("results").innerHTML = "";
                for(var i in data) {
                    console.log(data[i]);
                    document.getElementById("results").innerHTML += 
                    '<div class="col-lg-3 col-md-3 col-2 my-2">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<p className="card-text"><i>id:' + data[i]._id + '</i></p>' +
                            '<h5 class="card-title"><b>' + data[i].docTitle + '</b></h5>' +
                            '<p className="card-text">' + data[i].docBody + '</p>' +
                            '<p className="card-text">(' + data[i].docNumber + ')</p>' +
                    '    </div>' +
                    '</div>'
                }
            

        })
}

var getButton = document.getElementById('sort_2_docs');
getButton.addEventListener('submit', getUpper);

function getUpper(event) {
    event.preventDefault();
    var documentVal = event.target.documentIdsort2.value;
    const URL = `/docs/${2}`+`${documentVal}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
                document.getElementById("results").innerHTML = "";
                for(var i in data) {
                    console.log(data[i]);
                    document.getElementById("results").innerHTML += 
                    '<div class="col-lg-3 col-md-3 col-2 my-2">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<p className="card-text"><i>id:' + data[i]._id + '</i></p>' +
                            '<h5 class="card-title"><b>' + data[i].docTitle + '</b></h5>' +
                            '<p className="card-text">' + data[i].docBody + '</p>' +
                            '<p className="card-text">(' + data[i].docNumber + ')</p>' +
                    '    </div>' +
                    '</div>'
                }
            

        })
}

var getButton = document.getElementById('search_documents');
getButton.addEventListener('submit', getRequest);

function getRequest(event) {
    event.preventDefault();
    var documentId = event.target.documentIdS.value;
    const URL = `/docs/${documentId}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log('documentIduu: ', documentId);
            if (!documentId){
                document.getElementById("results").innerHTML = "";
                for(var i in data) {
                    console.log(data[i]);
                    document.getElementById("results").innerHTML += 
                    '<div class="col-lg-3 col-md-3 col-2 my-2">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<p className="card-text"><i>id:' + data[i]._id + '</i></p>' +
                            '<h5 class="card-title"><b>' + data[i].docTitle + '</b></h5>' +
                            '<p className="card-text">' + data[i].docBody + '</p>' +
                            '<p className="card-text">(' + data[i].docNumber + ')</p>' +
                    '    </div>' +
                    '</div>'
                }
            } else {
                console.log('documentId: ', documentId);
                document.getElementById("results").innerHTML = "";
                document.getElementById("results").innerHTML += 
                '<div class="col-lg-3 col-md-3 col-2 my-2">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<p className="card-text"><i>id:' + data._id + '</i></p>' +
                            '<h5 class="card-title"><b>' + data.docTitle + '</b></h5>' +
                            '<p className="card-text">' + data.docBody + '</p>' +
                            '<p className="card-text">(' + data.docNumber + ')</p>' +
                    '    </div>' +
                    '</div>'
            }

        })
        document.getElementById("documentIdS").value = "";
}

var postButton = document.getElementById('save_documents');
postButton.addEventListener('submit', newPost);

function newPost(event, post) {
    event.preventDefault();
    var documentTitle = event.target.documentTitle.value;
    var documentBody = event.target.documentBody.value;
    var documentNumber = event.target.numInput.value;
    
    document.getElementById("documentInput").value = "";
    document.getElementById("bodyInput").value = "";
    document.getElementById("numInput").value = "";
    document.getElementById("results").innerHTML = "";
    post = {
        docTitle: documentTitle,
        docBody: documentBody,
        docNumber: documentNumber
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    return fetch('/docs', options)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        var obj = document.getElementById("getButton");
        obj.click();
    })
}

var deleteButton = document.getElementById('delete_documents');
deleteButton.addEventListener('submit', deletePost);

function deletePost(event) {
    event.preventDefault();
    var documentId = event.target.documentIdDel.value;
    console.log('document: ', documentId);
    const options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-type': 'application/json'
        }),
        body: JSON.stringify({
            documentId: documentId
        })
    }
    const URL = `/docs/${documentId}`;
    fetch(URL, options)
    .then(response => response.json())
    .then(data => {
        document.getElementById("documentIdDel").value = "";
        document.getElementById("results").innerHTML = "";
        console.log('document to delete: ', data);
        var obj = document.getElementById("getButton");
        obj.click();
    })
}

var deleteButton = document.getElementById('delete_all');
deleteButton.addEventListener('submit', deleteAll);

function deleteAll(event) {
    event.preventDefault();
    const options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-type': 'application/json'
        })
    }
    const URL = '/docs';
    fetch(URL, options)
    .then(response => response.json())
    .then(data => {
        document.getElementById("results").innerHTML = "";
        console.log('document to delete: ', data);
        var obj = document.getElementById("getButton");
        obj.click();
    })
}


var putButton = document.getElementById('query_documents');
putButton.addEventListener('submit', putPost);

function putPost(event) {
    event.preventDefault();
    var documentId = event.target.documentIdUp.value;
    var documentTitle = event.target.updateTitle.value;
    var documentContent = event.target.updateBody.value;

    document.getElementById("updateTitle").value = "";
    document.getElementById("updateBody").value = "";
    document.getElementById("documentIdUp").value = "";
    document.getElementById("results").innerHTML = "";

    post = {
        docTitle: documentTitle,
        docBody: documentContent
    }
    const options = {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    const URL = `/docs/${documentId}`;

    return fetch(URL, options)
    .then(response => response.json())
    .then(data => {
        console.log('document to update: ', data);
        var obj = document.getElementById("getButton");
        obj.click();
    })

}