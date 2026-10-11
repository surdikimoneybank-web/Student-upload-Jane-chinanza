// Student data store
var students = [];

// DOM elements
var studentForm = document.getElementById('studentForm');
var nameInput = document.getElementById('name');
var matricInput = document.getElementById('matric');
var levelSelect = document.getElementById('level');
var departmentInput = document.getElementById('department');
var sampleButton = document.getElementById('sampleButton');
var emptyAddSamples = document.getElementById('emptyAddSamples');
var removeLastButton = document.getElementById('removeLastButton');
var toggleNamesButton = document.getElementById('toggleNames');
var studentGrid = document.getElementById('studentGrid');
var namesPanel = document.getElementById('namesPanel');
var nameChips = document.getElementById('nameChips');
var emptyState = document.getElementById('emptyState');
var studentCount = document.getElementById('studentCount');
var statusMessage = document.getElementById('statusMessage');

// Error elements
var nameError = document.getElementById('nameError');
var matricError = document.getElementById('matricError');
var levelError = document.getElementById('levelError');
var departmentError = document.getElementById('departmentError');

// Event listeners
studentForm.addEventListener('submit', handleAddStudent);
sampleButton.addEventListener('click', addSampleStudents);
emptyAddSamples.addEventListener('click', addSampleStudents);
removeLastButton.addEventListener('click', removeLast);
toggleNamesButton.addEventListener('click', toggleNamesPanel);

// Main functions

// Extract initials from a name: first letter of first two words
function initials(name) {
  var words = name.trim().split(' ');
  var result = '';
  for (var i = 0; i < words.length && i < 2; i++) {
    if (words[i].length > 0) {
      result += words[i].charAt(0).toUpperCase();
    }
  }
  return result;
}

// Validate form fields and return true if valid
function validate() {
  var isValid = true;

  // Clear all errors
  nameError.textContent = '';
  matricError.textContent = '';
  levelError.textContent = '';
  departmentError.textContent = '';

  // Validate name
  var name = nameInput.value.trim();
  if (name.length < 2) {
    nameError.textContent = 'Name must be at least 2 characters';
    isValid = false;
  }

  // Validate matric number
  var matric = matricInput.value.trim();
  var matricRegex = /^\d{2}\/\d{9}$/;
  if (!matric) {
    matricError.textContent = 'Matric number is required';
    isValid = false;
  } else if (!matricRegex.test(matric)) {
    matricError.textContent = 'Format must be 23/024145123';
    isValid = false;
  } else if (matricExists(matric)) {
    matricError.textContent = 'This matric number is already on the list';
    isValid = false;
  }

  // Validate level
  var level = levelSelect.value.trim();
  if (!level) {
    levelError.textContent = 'Please choose a level';
    isValid = false;
  }

  // Validate department
  var department = departmentInput.value.trim();
  if (department.length < 2) {
    departmentError.textContent = 'Department must be at least 2 characters';
    isValid = false;
  }

  return isValid;
}

// Check if a matric number already exists
function matricExists(matric) {
  for (var i = 0; i < students.length; i++) {
    if (students[i].matric === matric) {
      return true;
    }
  }
  return false;
}

// Handle form submission
function handleAddStudent(e) {
  e.preventDefault();

  if (!validate()) {
    return;
  }

  addStudent(
    nameInput.value.trim(),
    matricInput.value.trim(),
    levelSelect.value,
    departmentInput.value.trim()
  );
}

// Add a student to the array
function addStudent(name, matric, level, department) {
  var student = {
    name: name,
    matric: matric,
    level: level,
    department: department
  };

  students.push(student);
  statusMessage.textContent = 'Student added: ' + name;

  // Clear form
  studentForm.reset();
  nameInput.focus();

  // Redraw everything
  render();
}

// Remove the last student from the array
function removeLast() {
  if (students.length > 0) {
    var removed = students.pop();
    statusMessage.textContent = 'Removed: ' + removed.name;
    render();
  }
}

// Render the entire UI from the students array
function render() {
  // Update count pill
  var count = students.length;
  studentCount.textContent = count + ' student' + (count !== 1 ? 's' : '');

  // Show/hide empty state
  if (students.length === 0) {
    emptyState.classList.remove('hidden');
    studentGrid.classList.add('hidden');
    namesPanel.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    studentGrid.classList.remove('hidden');
  }

  // Disable/enable remove button
  removeLastButton.disabled = students.length === 0;

  // Render student cards
  studentGrid.innerHTML = '';
  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    var isNewest = i === students.length - 1;
    var card = createStudentCard(student, isNewest);
    studentGrid.appendChild(card);
  }

  // Render names panel if visible
  if (!namesPanel.classList.contains('hidden')) {
    renderNameChips();
  }
}

// Create a student card element
function createStudentCard(student, isNewest) {
  var card = document.createElement('div');
  card.className = 'student-card';
  if (isNewest) {
    card.classList.add('newest');
  }

  // Header with badge and name
  var header = document.createElement('div');
  header.className = 'student-card-header';

  var badge = document.createElement('div');
  badge.className = 'initials-badge';
  badge.textContent = initials(student.name);

  var nameSection = document.createElement('div');

  var nameP = document.createElement('p');
  nameP.className = 'student-name';
  nameP.textContent = student.name;

  var numberP = document.createElement('p');
  numberP.className = 'student-number';
  numberP.textContent = student.matric;

  nameSection.appendChild(nameP);
  nameSection.appendChild(numberP);

  header.appendChild(badge);
  header.appendChild(nameSection);

  if (isNewest) {
    var tag = document.createElement('div');
    tag.className = 'last-added-tag';
    tag.textContent = 'Last added';
    header.appendChild(tag);
  }

  card.appendChild(header);

  // Meta information
  var meta = document.createElement('div');
  meta.className = 'student-meta';

  var levelRow = document.createElement('div');
  levelRow.className = 'meta-row';
  var levelLabel = document.createElement('span');
  levelLabel.textContent = 'Level:';
  var levelValue = document.createElement('strong');
  levelValue.textContent = student.level;
  levelRow.appendChild(levelLabel);
  levelRow.appendChild(levelValue);

  var deptRow = document.createElement('div');
  deptRow.className = 'meta-row';
  var deptLabel = document.createElement('span');
  deptLabel.textContent = 'Department:';
  var deptValue = document.createElement('strong');
  deptValue.textContent = student.department;
  deptRow.appendChild(deptLabel);
  deptRow.appendChild(deptValue);

  meta.appendChild(levelRow);
  meta.appendChild(deptRow);

  card.appendChild(meta);

  return card;
}

// Render the name chips in the names panel
function renderNameChips() {
  nameChips.innerHTML = '';

  if (students.length === 0) {
    var emptyMsg = document.createElement('p');
    emptyMsg.style.color = 'var(--muted)';
    emptyMsg.textContent = 'No names to display.';
    nameChips.appendChild(emptyMsg);
    return;
  }

  for (var i = 0; i < students.length; i++) {
    var chip = document.createElement('div');
    chip.className = 'name-chip';
    chip.textContent = students[i].name;
    nameChips.appendChild(chip);
  }
}

// Toggle the names panel visibility
function toggleNamesPanel() {
  namesPanel.classList.toggle('hidden');
  if (!namesPanel.classList.contains('hidden')) {
    renderNameChips();
  }
}

// Add 3 sample students
function addSampleStudents() {
  var samples = [
    { name: 'Effa Divine', matric: '23/024145123', level: '300', department: 'Computer Science' },
    { name: 'Bassey Joy', matric: '23/024145124', level: '300', department: 'Accounting' },
    { name: 'Ikechukwu Emeka', matric: '23/024145125', level: '300', department: 'Mass Communication' }
  ];

  for (var i = 0; i < samples.length; i++) {
    var s = samples[i];
    students.push({
      name: s.name,
      matric: s.matric,
      level: s.level,
      department: s.department
    });
  }

  statusMessage.textContent = '3 sample students added';
  render();
}

// Initial render
render();
