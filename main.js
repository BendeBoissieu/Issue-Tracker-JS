document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  /*generate an id with the chance library   Return a global identifier*/
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if(localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues',JSON.stringify(issues));
  }
  else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

  }
  /*Initalize and remove all the previous value*/
  document.getElementById('issueInputForm').reset();
  /*to regenerate the list output*/
  fetchIssues();
  /*to prevent the form for submiting*/
  e.preventDefault();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesListe = document.getElementById('issuesList')

 /* Initialize of the content*/
  issuesList.innerHTML = '' ;

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    /*Output*/
    issuesList.innerHTML += '<div class="well">'+
                            '<h6>Issue Id = '+ id + '</h6>'+
                            '<p><<span class="label label-info"> ' + status + '</span></p>'+
                            '<h3>' + desc + '</h3>'+
                            '<p><<span class="glyphicon glyphicon-time"> ' + severity + '</span></p>'+
                            '<p><<span class="glyphicon glyphicon-user"> ' + assignedTo + '</span></p>'+
                            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">close</a>'+
                            '<a href="#" onclick="deleteissue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                            '</div> '
  }
}
