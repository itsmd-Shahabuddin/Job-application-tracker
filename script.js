let interviewList = [];
let rejectionList = [];


const totalJobs = document.getElementById('total');
const totalInterview = document.getElementById('totalinterview');
const totalRejected = document.getElementById('totalrejected');

const cardSection = document.getElementById('cardsection');
const interviewSection = document.getElementById('interviewList');
const rejectionSection = document.getElementById('rejectionList');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectionBtn = document.getElementById('rejected-btn');

function getTotal() {
    totalJobs.innerText = document.querySelectorAll('#cardsection .job-card').length;
    totalInterview.innerText = interviewList.length;
    totalRejected.innerText = rejectionList.length;
}

getTotal();


function toggleStyle(id) {

    allBtn.className = "btn btn-soft px-10 text-gray-700";
    interviewBtn.className = "btn btn-soft px-5 text-gray-700";
    rejectionBtn.className = "btn btn-soft px-5 text-gray-700";

    const selected = document.getElementById(id);

    selected.classList.remove("btn-soft", "text-gray-700");
    selected.classList.add("btn-primary", "text-white");

    cardSection.classList.add('hidden');
    interviewSection.classList.add('hidden');
    rejectionSection.classList.add('hidden');

    if (id === 'all-btn') {
        cardSection.classList.remove('hidden');
    }

    else if (id === 'interview-btn') {
        interviewSection.classList.remove('hidden');
        renderInterview();
    }

    else if (id === 'rejected-btn') {
        rejectionSection.classList.remove('hidden');
        renderRejection();
    }
}


document.querySelector('main').addEventListener('click', function (event) {

    const jobCard = event.target.closest('.job-card');
    if (!jobCard) return;

    const companyName = jobCard.querySelector('.company-name').innerText;

    function getData() {

        let data = {};

        data.companyName = companyName;
        data.designation = jobCard.querySelector('.designation').innerText;
        data.way = jobCard.querySelector('.way').innerText;
        data.time = jobCard.querySelector('.time').innerText;
        data.salary = jobCard.querySelector('.salary').innerText;
        data.description = jobCard.querySelector('.description').innerText;

        return data;
    }

    if (event.target.classList.contains('btn-inter')) {

        const data = getData();
        data.status = "Interview";

        rejectionList = rejectionList.filter(i => i.companyName !== companyName);

        if (!interviewList.find(i => i.companyName === companyName)) {
            interviewList.push(data);
        }

        jobCard.querySelector('.btn-sts').innerText = "Interview";

        renderInterview();
        renderRejection();
        getTotal();
    }


    else if (event.target.classList.contains('btn-reject')) {

        const data = getData();
        data.status = "Rejected";

        interviewList = interviewList.filter(i => i.companyName !== companyName);

        if (!rejectionList.find(i => i.companyName === companyName)) {
            rejectionList.push(data);
        }

        jobCard.querySelector('.btn-sts').innerText = "Rejected";

        renderInterview();
        renderRejection();
        getTotal();
    }

    else if (event.target.closest('.delete-btn')) {

        interviewList = interviewList.filter(i => i.companyName !== companyName);
        rejectionList = rejectionList.filter(i => i.companyName !== companyName);

        jobCard.remove();

        renderInterview();
        renderRejection();
        getTotal();
    }
});


function renderInterview() {
    interviewSection.innerHTML = "";

    interviewList.forEach(item => {
        interviewSection.innerHTML += createCard(item);
    });
}

function renderRejection() {
    rejectionSection.innerHTML = "";

    rejectionList.forEach(item => {
        rejectionSection.innerHTML += createCard(item);
    });
}

function createCard(item) {
    return `
    <div class="job-card flex justify-between p-6 bg-white rounded-lg">
                    <div>
                        <h1 class="company-name font-semibold text-[18px] text-[#002C5C]">${item.companyName}</h1>
                        <p class="designation text-gray-700">${item.designation}</p>

                        <div class="flex mt-3 mb-3 items-center gap-2 text-sm text-gray-700">
                            <span class="way">${item.way}</span><i class="fa-solid fa-circle text-[5px] text-gray-400"></i>
                            <span class="time">${item.time}</span><i class="fa-solid fa-circle text-[5px] text-gray-400"></i>
                            <span class="salary">${item.salary}</span>
                        </div>

                        <button class="btn-sts btn bg-[#EEF4FF] font-semibold mb-2 mt-2 text-[#002C5C]">${item.status}</button>

                        

                        <p class="description text-sm text-gray-800 mb-5">
                            ${item.description}
                        </p>

                        <div class="flex gap-3">
                            <button class="btn-inter btn font-semibold text-green-400 border border-green-400">Interview</button>
                            <button class="btn-reject btn font-semibold text-red-400 border border-red-400">Rejected</button>
                        </div>
                    </div>

                    <div>
                        <button class="delete-btn w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>`;
}
