
    let employees = [
      {
        id: 1,
        firstName: 'Ajith',
        lastName: 'Kumar',
        email: 'ajithk@gmail.com',
        department: 'Engineering',
        role: 'Frontend Developer'
      },
      {
        id: 2,
        firstName: 'Sanketh',
        lastName: 'sharma',
        email: 'sankethh@gmail.com',
        department: 'Marketing',
        role: 'SEO Analyst'
      },
       {
        id: 3,
        firstName: 'Rahul',
        lastName: 'sharma',
        email: 'rahull@gmail.com',
        department: 'HR',
        role: 'HR Manager'
      }
    ];

    let currentPage = 1;
    let itemsPerPage = 10;

    function renderList() {
      const listContainer = document.getElementById('employeeList');
      listContainer.innerHTML = '';

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedEmployees = employees.slice(start, end);

      paginatedEmployees.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
          <h3>${emp.firstName} ${emp.lastName}</h3>
          <p>Email: ${emp.email}</p>
          <p>Department: ${emp.department}</p>
          <p>Role: ${emp.role}</p>
          <button onclick="editEmployee(${emp.id})">Edit</button>
          <button onclick="deleteEmployee(${emp.id})">Delete</button>
        `;
        listContainer.appendChild(card);
      });

      renderPaginationControls();
    }

    function renderPaginationControls() {
      const totalPages = Math.ceil(employees.length / itemsPerPage);
      const controls = document.getElementById('paginationControls');
      controls.innerHTML = '';

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => {
          currentPage = i;
          renderList();
        };
        controls.appendChild(btn);
      }
    }

    function editEmployee(id) {
      const emp = employees.find(e => e.id === id);
      document.getElementById('employeeId').value = emp.id;
      document.getElementById('firstName').value = emp.firstName;
      document.getElementById('lastName').value = emp.lastName;
      document.getElementById('email').value = emp.email;
      document.getElementById('department').value = emp.department;
      document.getElementById('role').value = emp.role;
      document.getElementById('formContainer').style.display = 'block';
    }

    function deleteEmployee(id) {
      employees = employees.filter(e => e.id !== id);
      renderList();
    }

    document.getElementById('addEmployeeBtn').onclick = () => {
      document.getElementById('employeeForm').reset();
      document.getElementById('employeeId').value = '';
      document.getElementById('formContainer').style.display = 'block';
    };

    document.getElementById('cancelBtn').onclick = () => {
      document.getElementById('formContainer').style.display = 'none';
    };

    document.getElementById('employeeForm').onsubmit = (e) => {
      e.preventDefault();
      const id = document.getElementById('employeeId').value;
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const department = document.getElementById('department').value.trim();
      const role = document.getElementById('role').value.trim();

      if (!firstName || !lastName || !email.includes('@') || !department || !role) {
        document.getElementById('formErrors').textContent = 'Please fill all fields correctly.';
        return;
      }

      if (id) {
        const index = employees.findIndex(e => e.id == id);
        employees[index] = { id: Number(id), firstName, lastName, email, department, role };
      } else {
        employees.push({
          id: Date.now(),
          firstName,
          lastName,
          email,
          department,
          role
        });
      }

      document.getElementById('formContainer').style.display = 'none';
      renderList();
    };

    document.getElementById('searchInput').addEventListener('input', function () {
      const query = this.value.toLowerCase();
      const filtered = employees.filter(emp => emp.firstName.toLowerCase().includes(query) || emp.email.toLowerCase().includes(query));
      document.getElementById('employeeList').innerHTML = '';
      filtered.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
          <h3>${emp.firstName} ${emp.lastName}</h3>
          <p>Email: ${emp.email}</p>
          <p>Department: ${emp.department}</p>
          <p>Role: ${emp.role}</p>
          <button onclick="editEmployee(${emp.id})">Edit</button>
          <button onclick="deleteEmployee(${emp.id})">Delete</button>
        `;
        document.getElementById('employeeList').appendChild(card);
      });
    });

    document.getElementById('itemsPerPage').addEventListener('change', function () {
      itemsPerPage = Number(this.value);
      renderList();
    });

    renderList();
  