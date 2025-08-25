// ===================================================================================
//                                  سیستەمی بەڕێوەبردنی ئۆتۆمبێلەکان
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ------------------- پێناسەکردنی گۆڕاوە سەرەکییەکان -------------------
    const departments = [
        'دیوانی پارێزگا / نوسينگه‌ی پارێزگار', 'دیوانی پارێزگا / كارگێری گشتی', 'دیوانی پارێزگا / خزمه‌ت گوزاری شۆفیران',
        'قائمقامیه‌ته‌كان', 'بەرێوەبەری ناحيەكان (معوم)', 'ناحیه‌كان', 'بەرێوەبەری ناحیەكان - میلاكی وه‌زاره‌تی ناوخۆ',
        'ئەنجوومەنی پارێزگا', 'خانووبەرەی میری', 'گۆشتگەی هاوچەرخی هەولێر', 'فەرمانگە جیاوازەكان',
        'Ejcc پارێزگا', 'Ejcc پارێزگا - میلاكی وه‌زاره‌تی ناوخۆ', 'ئۆتۆمبێلە راگیراوەكان‌ له‌ گه‌راجی ناوچه‌ی پیشه‌سازی  له‌كاركه‌وتوون سه‌ر به‌ EJCC  يـــــــــــــــــــه',
        'دیوانی پارێزگا - له‌لایه‌ن فه‌رمانبه‌ران مامه‌له‌ی كرینیان بۆ كرایه', 'ئۆتۆمبێلە راگیراوەكان‌ له‌ گه‌راجی ناوچه‌ی پیشه‌سازی  له‌كاركه‌وتوون',
        'ئۆتۆمبێلە راگیراوەكان له‌ گەراجی دیوانی پارێزگای هه‌ولێر', 'ئۆتۆمبێلەكانی لیژنه‌ی زێده‌رۆیی پارێزگای هه‌ولێر- میلاكی وه‌زاره‌تی ناوخۆ',
        'ئۆتۆمبێلەكانی پارێزگای هه‌ولێر - میلاكی ئه‌نجومه‌نی وه‌زیران', 'ئیدارەی سۆران – نووسینگەی تایبەت', 'ئۆتۆمبیل تۆمار نه‌كراوه‌كان',
        'دیوانی پارێزگا - كارگێری گشتی  + فه‌رمانگه‌ جیاوازەكانی- ماتۆرسكیل', 'فه‌رمانگه‌  جیاوازەكان له‌سه‌ر پارێزگای هه‌ولێر - هاته‌خوار'
    ];
    
    const includedDepartmentsForMainTotal = [
        'دیوانی پارێزگا / نوسينگه‌ی پارێزگار', 'دیوانی پارێزگا / كارگێری گشتی', 'دیوانی پارێزگا / خزمه‌ت گوزاری شۆفیران',
        'قائمقامیه‌ته‌كان', 'بەرێوەبەری ناحيەكان (معوم)', 'ناحیه‌كان', 'ئەنجوومەنی پارێزگا', 'خانووبەرەی میری',
        'گۆشتگەی هاوچەرخی هەولێر', 'فەرمانگە جیاوازەكان', 'Ejcc پارێزگا', 'دیوانی پارێزگا - له‌لایه‌ن فه‌رمانبه‌ران مامه‌له‌ی كرینیان بۆ كرایه',
        'ئۆتۆمبێلە راگیراوەكان‌ له‌ گه‌راجی ناوچه‌ی پیشه‌سازی  له‌كاركه‌وتوون', 'ئۆتۆمبێلە راگیراوەكان له‌ گەراجی دیوانی پارێزگای هه‌ولێر'
    ];
    
    const STORAGE_KEY = 'erbil_gov_vehicles_data_v3';
    let vehicleData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    const DOM = {
        departmentList: document.getElementById('department-list'),
        modal: document.getElementById('vehicle-modal'),
        closeModalBtn: document.querySelector('#vehicle-modal .close-btn'),
        addNewVehicleBtn: document.getElementById('add-new-vehicle-btn'),
        vehicleForm: document.getElementById('vehicle-form'),
        modalTitle: document.getElementById('modal-title'),
        departmentSelect: document.getElementById('department'),
        searchInput: document.getElementById('search-input'),
        backupBtn: document.getElementById('backup-data-btn'),
        restoreInput: document.getElementById('restore-input'),
        printReportBtn: document.getElementById('print-report-btn'),
        printArea: document.getElementById('print-area'),
        expenseList: document.getElementById('expense-list'),
        addExpenseBtn: document.getElementById('add-expense-btn'),
        totalExpenses: document.getElementById('total-expenses'),
        modalActions: document.getElementById('modal-actions'),
        reportModal: document.getElementById('report-modal'),
        closeReportModalBtn: document.querySelector('#report-modal .close-btn'),
        reportDepartmentList: document.getElementById('report-department-list'),
        printSelectedBtn: document.getElementById('print-selected-btn'),
        selectAllDeptsBtn: document.getElementById('select-all-depts-btn'),
        deselectAllDeptsBtn: document.getElementById('deselect-all-depts-btn'),
    };
    
    function printContent(htmlContent) {
        const oldFrame = document.getElementById('print-frame');
        if (oldFrame) {
            oldFrame.remove();
        }

        const printFrame = document.createElement('iframe');
        printFrame.id = 'print-frame';
        printFrame.style.position = 'absolute';
        printFrame.style.width = '0';
        printFrame.style.height = '0';
        printFrame.style.border = '0';
        document.body.appendChild(printFrame);
        
        const frameDoc = printFrame.contentWindow.document;
        frameDoc.open();
        frameDoc.write(htmlContent);
        frameDoc.close();

        setTimeout(() => {
            try {
                printFrame.contentWindow.focus();
                printFrame.contentWindow.print();
            } catch(e) {
                console.error("Print failed:", e);
                alert("نەتوانرا چاپ بکرێت. تکایە دڵنیابە لەوەی وێبگەڕەکەت ڕێگری لە چاپکردن ناکات.");
            }
            setTimeout(() => {
                document.body.removeChild(printFrame);
            }, 1000);
        }, 500);
    }

    function renderUI(searchTerm = '') {
        DOM.departmentList.innerHTML = '';
        const trimmedSearchTerm = searchTerm.trim();
        
        const isPureNumber = (str) => {
            if (str === '') return false;
            return /^\d+$/.test(str);
        };

        let filterFunction;

        if (isPureNumber(trimmedSearchTerm)) {
            filterFunction = v => {
                return (v.vehicleNumber || '').toString().trim() === trimmedSearchTerm;
            }
        } else {
            const lowerCaseSearchTerm = trimmedSearchTerm.toLowerCase();
            filterFunction = v => {
                if (!lowerCaseSearchTerm) return true;
                return (
                    ((v.vehicleType || '').toLowerCase().includes(lowerCaseSearchTerm)) ||
                    ((v.vehicleNumber || '').toLowerCase().includes(lowerCaseSearchTerm)) ||
                    ((v.userName || '').toLowerCase().includes(lowerCaseSearchTerm)) ||
                    ((v.vehicleModel || '').toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
                    ((v.recipientParty || '').toLowerCase().includes(lowerCaseSearchTerm))
                );
            };
        }

        departments.forEach(deptName => {
            const vehiclesInDept = Object.values(vehicleData)
                .filter(v => v.department === deptName)
                .filter(filterFunction)
                .sort((a, b) => {
                    const parseNumeric = (str) => {
                        if (typeof str !== 'string' || !str) return Infinity; 
                        const match = str.match(/\d+/);
                        return match ? parseInt(match[0], 10) : Infinity;
                    };

                    const numA = parseNumeric(a.vehicleNumber);
                    const numB = parseNumeric(b.vehicleNumber);
                    
                    return numA - numB;
                });

            if (trimmedSearchTerm && vehiclesInDept.length === 0) return;
            
            const deptId = `dept-${departments.indexOf(deptName)}`;
            const departmentDiv = document.createElement('div');
            departmentDiv.className = 'department';
            departmentDiv.innerHTML = `
                <div class="department-header" data-target="${deptId}">
                    <h2>${deptName} (${vehiclesInDept.length})</h2>
                    <span class="arrow"></span>
                </div>
                <div class="department-content" id="${deptId}">
                    <table class="vehicle-table">
                        <thead>
                            <tr><th>جۆری ئۆتۆمبێل</th><th>ژمارەی ئۆتۆمبێل</th><th>مۆدێل</th><th>لایەنی وەرگر</th><th>بەکارهێنەر</th><th>کردارەکان</th></tr>
                        </thead>
                        <tbody>
                            ${vehiclesInDept.map(vehicle => `
                                <tr data-id="${vehicle.id}">
                                    <td data-label="جۆری ئۆتۆمبێل">${vehicle.vehicleType || ''}</td>
                                    <td data-label="ژمارەی ئۆتۆمبێل">${vehicle.vehicleNumber || ''}</td>
                                    <td data-label="مۆدێل">${vehicle.vehicleModel || ''}</td>
                                    <td data-label="لایەنی وەرگر">${vehicle.recipientParty || ''}</td>
                                    <td data-label="بەکارهێنەر">${vehicle.userName || ''}</td>
                                    <td data-label="کردارەکان" class="actions">
                                        <button class="btn btn-sm btn-info view-btn" title="بینین"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg></button>
                                        <button class="btn btn-sm btn-success edit-btn" title="دەستکاری"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></button>
                                        <button class="btn btn-sm btn-warning transfer-btn" title="گواستنەوە"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.347a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5a1.5 1.5 0 0 1-1.5-1.5V2a.5.5 0 0 0-.5-.5"/></svg></button>
                                        <button class="btn btn-sm btn-info print-btn" title="چاپکردن"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/><path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zM1 7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1z"/></svg></button>
                                        <button class="btn btn-sm btn-danger delete-btn" title="سڕینەوە"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg></button>
                                    </td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>`;
            DOM.departmentList.appendChild(departmentDiv);
        });
        updateSummaryCards();
        addEventListenersToButtons();
    }
    
    function updateSummaryCards() {
        const allVehicles = Object.values(vehicleData);

        const mainTotalVehicles = allVehicles.filter(v => includedDepartmentsForMainTotal.includes(v.department));
        document.getElementById('main-total-count').textContent = mainTotalVehicles.length;
        
        document.getElementById('total-cars-count').textContent = allVehicles.length;

        const motorcycles = allVehicles.filter(v => v.department && v.department.includes('ماتۆرسكیل'));
        document.getElementById('total-motorcycles-count').textContent = motorcycles.length;

        const stoppedVehicles = allVehicles.filter(v => v.department && v.department.includes('راگیراوەكان‌'));
        document.getElementById('total-stopped-count').textContent = stoppedVehicles.length;

        let highestExpenseVehicle = null;
        let maxExpense = 0;

        allVehicles.forEach(vehicle => {
            const totalVehicleExpense = (vehicle.expenses || []).reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
            if (totalVehicleExpense > maxExpense) {
                maxExpense = totalVehicleExpense;
                highestExpenseVehicle = vehicle;
            }
        });

        const highestAmountEl = document.getElementById('highest-expense-amount');
        const highestVehicleEl = document.getElementById('highest-expense-vehicle');

        if (highestExpenseVehicle && maxExpense > 0) {
            highestAmountEl.textContent = maxExpense.toLocaleString();
            highestVehicleEl.textContent = `ئۆتۆمبیلی ژماره‌: ${highestExpenseVehicle.vehicleNumber || 'نادیار'}`;
        } else {
            highestAmountEl.textContent = '0';
            highestVehicleEl.textContent = 'هیچ خەرجییەک نییە';
        }
    }

    function addEventListenersToButtons() {
        document.querySelectorAll('.department-header').forEach(header => {
            const existingHandler = header.clickHandler;
            if (existingHandler) header.removeEventListener('click', existingHandler);
            const newHandler = () => {
                const content = document.getElementById(header.dataset.target);
                header.classList.toggle('active');
                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            };
            header.addEventListener('click', newHandler);
            header.clickHandler = newHandler;
        });
        document.querySelectorAll('.actions .btn').forEach(button => {
            const existingHandler = button.clickHandler;
            if (existingHandler) button.removeEventListener('click', existingHandler);
            const newHandler = (e) => {
                const vehicleId = e.currentTarget.closest('tr').dataset.id;
                if (e.currentTarget.classList.contains('view-btn')) openModal(vehicleId, true);
                else if (e.currentTarget.classList.contains('edit-btn')) openModal(vehicleId, false);
                else if (e.currentTarget.classList.contains('delete-btn')) deleteVehicle(vehicleId);
                else if (e.currentTarget.classList.contains('print-btn')) printSingleVehicle(vehicleId);
                else if (e.currentTarget.classList.contains('transfer-btn')) transferVehicle(vehicleId);
            };
            button.addEventListener('click', newHandler);
            button.clickHandler = newHandler;
        });
    }

    function openModal(vehicleId = null, isViewOnly = false) {
        DOM.vehicleForm.reset();
        DOM.expenseList.innerHTML = '';
        populateDepartmentSelect();
        const formElements = DOM.vehicleForm.elements;
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = isViewOnly;
        }
        DOM.addExpenseBtn.style.display = isViewOnly ? 'none' : 'block';
        DOM.modalActions.style.display = isViewOnly ? 'none' : 'block';
        if (vehicleId) {
            const vehicle = vehicleData[vehicleId];
            DOM.modalTitle.textContent = isViewOnly ? 'بینینی زانیاری ئۆتۆمبێل' : 'دەستکاریکردنی زانیاری ئۆتۆمبێل';
            DOM.vehicleForm.elements['vehicle-id'].value = vehicle.id;
            DOM.vehicleForm.elements['department'].value = vehicle.department;
            DOM.vehicleForm.elements['vehicle-type'].value = vehicle.vehicleType || '';
            DOM.vehicleForm.elements['vehicle-number'].value = vehicle.vehicleNumber || '';
            DOM.vehicleForm.elements['vehicle-color'].value = vehicle.vehicleColor || '';
            DOM.vehicleForm.elements['vehicle-model'].value = vehicle.vehicleModel || '';
            DOM.vehicleForm.elements['user-name'].value = vehicle.userName || '';
            DOM.vehicleForm.elements['recipient-party'].value = vehicle.recipientParty || '';
            DOM.vehicleForm.elements['contact-number'].value = vehicle.contactNumber || '';
            DOM.vehicleForm.elements['file-number'].value = vehicle.fileNumber || '';
            DOM.vehicleForm.elements['receipt-date'].value = vehicle.receiptDate || '';
            DOM.vehicleForm.elements['vin-number'].value = vehicle.vinNumber || '';
            DOM.vehicleForm.elements['notes'].value = vehicle.notes || '';
            if (vehicle.expenses && Array.isArray(vehicle.expenses)) {
                vehicle.expenses.forEach(expense => renderExpenseItem(expense, isViewOnly));
            }
            updateTotalExpenses();
        } else {
            DOM.modalTitle.textContent = 'زیادکردنی ئۆتۆمبێلی نوێ';
        }
        DOM.modal.style.display = 'block';
    }

    function closeModal() {
        DOM.modal.style.display = 'none';
    }

    function populateDepartmentSelect() {
        DOM.departmentSelect.innerHTML = departments.map(dept => `<option value="${dept}">${dept}</option>`).join('');
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const id = DOM.vehicleForm.elements['vehicle-id'].value || `v_${new Date().getTime()}`;
        const expenses = [];
        DOM.expenseList.querySelectorAll('.expense-item').forEach(item => {
            expenses.push({
                amount: item.querySelector('.expense-amount').value,
                date: item.querySelector('.expense-date').value,
                receipt: item.querySelector('.expense-receipt').value,
                reason: item.querySelector('.expense-reason').value,
            });
        });
        const vehicle = {
            id: id,
            department: DOM.vehicleForm.elements['department'].value,
            vehicleType: DOM.vehicleForm.elements['vehicle-type'].value,
            vehicleNumber: DOM.vehicleForm.elements['vehicle-number'].value,
            vehicleColor: DOM.vehicleForm.elements['vehicle-color'].value,
            vehicleModel: DOM.vehicleForm.elements['vehicle-model'].value,
            userName: DOM.vehicleForm.elements['user-name'].value,
            recipientParty: DOM.vehicleForm.elements['recipient-party'].value,
            contactNumber: DOM.vehicleForm.elements['contact-number'].value,
            fileNumber: DOM.vehicleForm.elements['file-number'].value,
            receiptDate: DOM.vehicleForm.elements['receipt-date'].value,
            vinNumber: DOM.vehicleForm.elements['vin-number'].value,
            notes: DOM.vehicleForm.elements['notes'].value,
            expenses: expenses
        };
        vehicleData[id] = vehicle;
        saveData();
        closeModal();
        renderUI(DOM.searchInput.value);
        alert('داتاکان بە سەرکەوتوویی پاشەکەوت کران!');
    }

    function deleteVehicle(vehicleId) {
        if (confirm('دڵنیایت لە سڕینەوەی ئەم ئۆتۆمبێلە؟')) {
            delete vehicleData[vehicleId];
            saveData();
            renderUI(DOM.searchInput.value);
            alert('ئۆتۆمبێلەکە سڕایەوە.');
        }
    }

    function transferVehicle(vehicleId) {
        const vehicle = vehicleData[vehicleId];
        const newDepartmentName = prompt(`گواستنەوەی ئۆتۆمبێلی "${vehicle.vehicleType} - ${vehicle.vehicleNumber}"\nتکایە ناوی بەشی نوێ بنووسە:`, vehicle.department);
        if (newDepartmentName && departments.includes(newDepartmentName)) {
            vehicle.department = newDepartmentName;
            saveData();
            renderUI();
            alert('ئۆتۆمبێلەکە بە سەرکەوتوویی گواسترایەوە.');
        } else if (newDepartmentName) {
            alert('هەڵە: ناوی بەشەکە دروست نییە!');
        }
    }
    
    function renderExpenseItem(expense = {}, isViewOnly = false) {
        const item = document.createElement('div');
        item.className = 'expense-item';
        item.innerHTML = `<input type="number" class="expense-amount" placeholder="بڕی پارە" value="${expense.amount || ''}" ${isViewOnly ? 'disabled' : ''}><input type="date" class="expense-date" placeholder="بەروار" value="${expense.date || ''}" ${isViewOnly ? 'disabled' : ''}><input type="text" class="expense-receipt" placeholder="ژ. پسوڵە" value="${expense.receipt || ''}" ${isViewOnly ? 'disabled' : ''}><input type="text" class="expense-reason" placeholder="هۆکاری خەرجکردن" value="${expense.reason || ''}" ${isViewOnly ? 'disabled' : ''}><button type="button" class="btn btn-sm btn-danger remove-expense-btn" ${isViewOnly ? 'style="display:none;"' : ''}>X</button>`;
        
        item.querySelector('.remove-expense-btn').addEventListener('click', () => {
            if (confirm('دڵنیایت لە سڕینەوەی ئەم خەرجییە؟')) {
                item.remove();
                updateTotalExpenses();
            }
        });
        
        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', updateTotalExpenses);
        });
        DOM.expenseList.appendChild(item);
    }

    function updateTotalExpenses() {
        let total = 0;
        DOM.expenseList.querySelectorAll('.expense-amount').forEach(input => {
            total += Number(input.value) || 0;
        });
        DOM.totalExpenses.textContent = total.toLocaleString();
    }

    // ########## گۆڕانکاری لێرەدایە: لابردنی فووتەر لە ڕاپۆرتی تاکەکەسی ##########
    function printSingleVehicle(vehicleId) {
        const vehicle = vehicleData[vehicleId];
        if (!vehicle) return;
        let expensesHTML = '';
        let totalExpenses = 0;
        if (vehicle.expenses && vehicle.expenses.length > 0) {
            vehicle.expenses.forEach(exp => {
                totalExpenses += Number(exp.amount) || 0;
            });
            expensesHTML = `<h3 class="print-section-title">تۆماری خەرجییەکان</h3><table class="print-table"><thead><tr><th>بڕی پارە (دینار)</th><th>بەروار</th><th>ژ. پسوڵە</th><th>هۆکاری خەرجکردن</th></tr></thead><tbody>${vehicle.expenses.map(exp => `<tr><td>${exp.amount ? Number(exp.amount).toLocaleString() : '0'}</td><td>${exp.date || ''}</td><td>${exp.receipt || ''}</td><td>${exp.reason || ''}</td></tr>`).join('')}</tbody><tfoot><tr><td style="font-weight: bold;">کۆی گشتی:</td><td colspan="3" style="font-weight: bold; text-align: left;">${totalExpenses.toLocaleString()} دینار</td></tr></tfoot></table>`;
        }
        
        // فووتەر لێرە لابرا
        const reportBody = `<div class="print-header"><h1>ڕاپۆرتی وردی ئۆتۆمبێل</h1><p>پارێزگای هەولێر</p></div><h3 class="print-section-title">زانیارییە سەرەکییەکان</h3><table class="print-table info-table"><tbody><tr><td><strong>بەش:</strong></td><td>${vehicle.department || ''}</td><td><strong>جۆری ئۆتۆمبێل:</strong></td><td>${vehicle.vehicleType || ''}</td></tr><tr><td><strong>ژمارەی ئۆتۆمبێل:</strong></td><td>${vehicle.vehicleNumber || ''}</td><td><strong>ڕەنگ:</strong></td><td>${vehicle.vehicleColor || ''}</td></tr><tr><td><strong>مۆدێل (ساڵ):</strong></td><td>${vehicle.vehicleModel || ''}</td><td><strong>ژمارەی شانسی (VIN):</strong></td><td>${vehicle.vinNumber || ''}</td></tr><tr><td><strong>ناوی بەکارهێنەر:</strong></td><td>${vehicle.userName || ''}</td><td><strong>لایەنی وەرگر:</strong></td><td>${vehicle.recipientParty || ''}</td></tr><tr><td><strong>ژمارەی پەیوەندی:</strong></td><td>${vehicle.contactNumber || ''}</td><td><strong>ژمارەی دۆسیە:</strong></td><td>${vehicle.fileNumber || ''}</td></tr><tr><td><strong>بەرواری وەرگرتن:</strong></td><td colspan="3">${vehicle.receiptDate || ''}</td></tr><tr><td><strong>تێبینی:</strong></td><td colspan="3" style="white-space: pre-wrap; line-height: 1.6;">${vehicle.notes || 'هیچ تێبینییەک نییە'}</td></tr></tbody></table>${expensesHTML}`;
        
        // ستایلی CSSـی فووتەریش لێرە لابرا
        const fullHtml = `<!DOCTYPE html><html dir="rtl" lang="ku"><head><meta charset="UTF-8"><title>ڕاپۆرتی ئۆتۆمبێل - ${vehicle.vehicleNumber || ''}</title><style>body{font-family:'Segoe UI',Tahoma,sans-serif;margin:20px;direction:rtl;color:#333}.print-header{text-align:center;margin-bottom:25px;border-bottom:2px solid #000;padding-bottom:10px}.print-header h1{margin:0;font-size:22px}.print-header p{margin:5px 0 0;font-size:16px}.print-section-title{background-color:#f2f2f2;padding:8px;margin-top:25px;margin-bottom:10px;font-size:16px;border-right:4px solid #555}.print-table{width:100%;border-collapse:collapse;font-size:14px}.print-table th,.print-table td{border:1px solid #ccc;padding:8px;text-align:right;vertical-align:top}.print-table th{background-color:#e9ecef;font-weight:bold}.info-table td:nth-child(odd){width:15%;font-weight:bold}.info-table td:nth-child(even){width:35%}@page{size:A4;margin:15mm}</style></head><body>${reportBody}</body></html>`;

        printContent(fullHtml);
    }

    function printGeneralReport(departmentsToPrint) {
        let reportBody = `<div style="text-align: center; margin-bottom: 20px;"><h1>ڕاپۆرتی گشتی ئۆتۆمبێلەکان</h1><p>بەروار: ${new Date().toLocaleDateString()}</p></div>`;
        departmentsToPrint.forEach(deptName => {
            const vehiclesInDept = Object.values(vehicleData).filter(v => v.department === deptName);
            if (vehiclesInDept.length > 0) {
                reportBody += `<div style="page-break-inside: avoid;"><h3 style="background-color: #f0f0f0; padding: 5px; border-right: 3px solid #555; margin-top: 15px;">${deptName} (کۆ: ${vehiclesInDept.length})</h3><table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;"><thead><tr><th>جۆری ئۆتۆمبێل</th><th>ژمارەی ئۆتۆمبێل</th><th>مۆدێل</th><th>لایەنی وەرگر</th><th>بەکارهێنەر</th></tr></thead><tbody>${vehiclesInDept.map(v => `<tr><td>${v.vehicleType || ''}</td><td>${v.vehicleNumber || ''}</td><td>${v.vehicleModel || ''}</td><td>${v.recipientParty || ''}</td><td>${v.userName || ''}</td></tr>`).join('')}</tbody></table></div>`;
            }
        });
        
        const fullHtml = `<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>ڕاپۆرتی گشتی ئۆتۆمبێلەکان</title><style>body{font-family:'Segoe UI',Tahoma,sans-serif;margin:0;padding:20px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #333;padding:5px;text-align:right;word-break:break-word}h1,h2,h3{text-align:right}h1,h2{text-align:center}@page{size:A4;margin:10mm;@bottom-center{content:"Page " counter(page) " of " counter(pages);font-size:10pt}}@media print{div{page-break-inside:avoid}h3{page-break-before:auto}}</style></head><body>${reportBody}</body></html>`;

        printContent(fullHtml);
    }

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicleData));
    }

    DOM.addNewVehicleBtn.addEventListener('click', () => openModal());
    DOM.closeModalBtn.addEventListener('click', closeModal);
    DOM.vehicleForm.addEventListener('submit', handleFormSubmit);
    DOM.searchInput.addEventListener('input', () => renderUI(DOM.searchInput.value));
    DOM.addExpenseBtn.addEventListener('click', () => renderExpenseItem());
    DOM.printReportBtn.addEventListener('click', openReportModal);
    DOM.backupBtn.addEventListener('click', () => {
        if (Object.keys(vehicleData).length === 0) {
            alert('هیچ داتایەک نییە بۆ داگرتن!');
            return;
        }
        const dataStr = JSON.stringify(vehicleData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'vehicles_backup.json';
        link.click();
        URL.revokeObjectURL(url);
    });
    DOM.restoreInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                if (confirm('ئایا دڵنیایت لە بارکردنی داتای نوێ؟ هەموو داتای ئێستا دەسڕدرێتەوە.')) {
                    vehicleData = importedData;
                    saveData();
                    renderUI();
                    alert('داتا بە سەرکەوتوویی بارکرا.');
                }
            } catch (error) {
                alert('هەڵەیەک ڕوویدا! تکایە دڵنیابە فایلێکی JSONی دروستت هەڵبژاردووە.');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });

    function openReportModal() {
        DOM.reportDepartmentList.innerHTML = '';
        departments.forEach(deptName => {
            const hasVehicles = Object.values(vehicleData).some(v => v.department === deptName);
            if (hasVehicles) {
                const item = document.createElement('label');
                item.className = 'department-checkbox-item';
                item.innerHTML = `<input type="checkbox" class="dept-checkbox" value="${deptName}"> ${deptName}`;
                DOM.reportDepartmentList.appendChild(item);
            }
        });
        DOM.reportModal.style.display = 'block';
    }

    function closeReportModal() {
        DOM.reportModal.style.display = 'none';
    }

    function handlePrintSelected() {
        const selectedDepts = [];
        const checkboxes = DOM.reportDepartmentList.querySelectorAll('.dept-checkbox:checked');
        if (checkboxes.length === 0) {
            alert('تکایە لانیکەم یەک بەش هەڵبژێرە بۆ چاپکردن!');
            return;
        }
        checkboxes.forEach(checkbox => {
            selectedDepts.push(checkbox.value);
        });
        printGeneralReport(selectedDepts);
        closeReportModal();
    }

    DOM.closeReportModalBtn.addEventListener('click', closeReportModal);
    DOM.printSelectedBtn.addEventListener('click', handlePrintSelected);
    DOM.selectAllDeptsBtn.addEventListener('click', () => {
        DOM.reportDepartmentList.querySelectorAll('.dept-checkbox').forEach(cb => cb.checked = true);
    });
    DOM.deselectAllDeptsBtn.addEventListener('click', () => {
        DOM.reportDepartmentList.querySelectorAll('.dept-checkbox').forEach(cb => cb.checked = false);
    });
    window.addEventListener('click', (e) => {
        if (e.target == DOM.modal) closeModal();
        if (e.target == DOM.reportModal) closeReportModal();
    });

    renderUI();
});