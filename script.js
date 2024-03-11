// Array para armazenar os pacientes
let patients = [];

// Função para adicionar ou atualizar um paciente
function addOrUpdatePatient() {
    const patientName = document.getElementById('patientName').value;
    const patientAge = document.getElementById('patientAge').value;
    const patientPhone = document.getElementById('patientPhone').value;
    const patientCity = document.getElementById('patientCity').value;

    // Verifica se o paciente já existe na lista
    const existingPatient = patients.find(patient => patient.name === patientName);

    if (existingPatient) {
        // Atualiza os detalhes do paciente existente
        existingPatient.age = patientAge;
        existingPatient.phone = patientPhone;
        existingPatient.city = patientCity;
    } else {
        // Adiciona um novo paciente à lista
        const newPatient = {
            name: patientName,
            age: patientAge,
            phone: patientPhone,
            city: patientCity
        };
        patients.push(newPatient);
    }

    // Limpa o formulário após adicionar/atualizar
    document.getElementById('patientForm').reset();

    // Atualiza a lista de pacientes exibida na tela
    updatePatientList();
}

// Função para buscar pacientes pelo nome
function searchPatients() {
    const searchName = document.getElementById('searchName').value.toLowerCase();

    // Filtra os pacientes que correspondem ao nome pesquisado
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchName)
    );

    // Atualiza a lista de pacientes exibida na tela com os resultados da busca
    updatePatientList(filteredPatients);
}

// Função para limpar a busca e exibir todos os pacientes
function clearSearch() {
    document.getElementById('searchForm').reset();
    updatePatientList();
}

// Função para editar um paciente
function editPatient(patientName) {
    // Encontra o paciente na lista pelo nome
    const patientToEdit = patients.find(patient => patient.name === patientName);

    // Preenche o formulário com os detalhes do paciente
    document.getElementById('patientName').value = patientToEdit.name;
    document.getElementById('patientAge').value = patientToEdit.age;
    document.getElementById('patientPhone').value = patientToEdit.phone;
    document.getElementById('patientCity').value = patientToEdit.city;

    // Remove o paciente da lista para evitar duplicatas durante a atualização
    patients = patients.filter(patient => patient.name !== patientName);

    // Atualiza a lista de pacientes exibida na tela
    updatePatientList();
}

// Função para excluir um paciente
function deletePatient(patientName) {
    // Filtra os pacientes, excluindo o paciente com o nome fornecido
    patients = patients.filter(patient => patient.name !== patientName);

    // Atualiza a lista de pacientes exibida na tela
    updatePatientList();
}

// Função para atualizar a lista de pacientes exibida na tela
function updatePatientList(filteredPatients = patients) {
    const patientList = document.getElementById('patientList');

    // Limpa a lista atual
    patientList.innerHTML = '';

    // Adiciona cada paciente à lista
    filteredPatients.forEach(patient => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <strong>${patient.name}</strong>
                <span>${patient.age}</span>
                <span>${patient.phone}</span>
                <span>${patient.city}</span>
            </div>
            <div>
                <button class="hover-effect" onclick="editPatient('${patient.name}')">Editar</button>
                <button class="hover-effect" onclick="deletePatient('${patient.name}')">Excluir</button>
            </div>
        `;
        patientList.appendChild(listItem);
    });
}

// Adiciona os ouvintes de eventos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addButton').addEventListener('click', addOrUpdatePatient);
});
