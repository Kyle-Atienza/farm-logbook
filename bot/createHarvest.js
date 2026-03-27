const BASE_URL = 'your_base_url_here';

const createHarvest = async (tgId, quantity) => {
    let employeeId;

    // get telegram id
    const employee = await fetch(`${BASE_URL}/employees/tg/${tgId}`);
    if (!employee.ok) {
        // if not found, create employee
        const newEmployee = await fetch(`${BASE_URL}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tgId })
        });
        if (!newEmployee.ok) throw new Error('Failed to create employee');
        const createdEmployee = await newEmployee.json();
        employeeId = createdEmployee.id;
    } else {
        const existingEmployee = await employee.json();
        employeeId = existingEmployee.id;
    }
    // create harvest with employee id as loggedBy

    const harvestResponse = await fetch(`${BASE_URL}/harvests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loggedBy: employeeId, quantity })
    });
    if (!harvestResponse.ok) throw new Error('Failed to create harvest');
    return await harvestResponse.json();
};

module.exports = createHarvest;