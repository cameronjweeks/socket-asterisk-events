function addRow(channel, number, uniqueId, state) {
  const table = document
    .getElementById('dataTable')
    .getElementsByTagName('tbody')[0];

  let newRow = table.insertRow();

  let channelCell = newRow.insertCell(0);
  let numberCell = newRow.insertCell(1);
  let uniqueIdCell = newRow.insertCell(2);
  let stateCell = newRow.insertCell(3);

  channelCell.innerHTML = channel;
  numberCell.innerHTML = number;
  uniqueIdCell.innerHTML = uniqueId;
  stateCell.innerHTML = state;

  newRow.setAttribute('data-uniqueId', uniqueId);
}

function removeRow(uniqueId) {
  const table = document
    .getElementById('dataTable')
    .getElementsByTagName('tbody')[0];
  const rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    if (
      rows[i].getAttribute('data-uniqueId') === uniqueId
    ) {
      table.deleteRow(i);
      break;
    }
  }
}

function processMessage(event) {
  if (event.event === 'Newchannel') {
    addRow(
      event.channel,
      event.exten,
      event.uniqueid,
      'Active',
    );
  } else if (event.event === 'Hangup') {
    removeRow(event.uniqueid);
  }
}
