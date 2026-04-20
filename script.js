let interviewList=[];
let rejectionList=[];

let totalJobs=document.getElementById('total');
let totalInterview=document.getElementById('totalinterview');
let totalRejected=document.getElementById('totalrejected');
const cardSection=document.getElementById('cardsection');

function getTotal(){

    totalJobs.innerText=cardSection.children.length;
    totalInterview.innerText=interviewList.length;
    totalRejected.innerText=rejectionList.length;
    
};

getTotal();

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectionBtn = document.getElementById('rejected-btn');

function toggleStyle(id) {

    allBtn.className = "btn btn-soft px-10 text-gray-700";
    interviewBtn.className = "btn btn-soft px-5 text-gray-700";
    rejectionBtn.className = "btn btn-soft px-5 text-gray-700";

    const selected = document.getElementById(id);
    selected.classList.remove("btn-soft", "text-gray-700");
    selected.classList.add("btn-primary", "text-white");
};

const mainContainer=document.querySelector('main');

mainContainer.addEventListener('click',function(event){
    if(event.target.classList.contains('btn-inter')){
    const parentNode=event.target.parentNode.parentNode;
    const companyName= parentNode.querySelector('.company-name').innerText;
    const designation= parentNode.querySelector('.designation').innerText;
    const way= parentNode.querySelector('.way').innerText;
    const time= parentNode.querySelector('.time').innerText;
    const salary= parentNode.querySelector('.salary').innerText;
    const status= parentNode.querySelector('.btn-sts').innerText;
    const description= parentNode.querySelector('.description').innerText;

    const cardInfo={
        companyName,
        designation,
        way,
        time,
        salary,
        status,
        description
    }
const companyNamelisted=interviewList.find(item=> item.companyName ==cardInfo.companyName);
parentNode.querySelector('.btn-sts').innerText='Interview'; 

if(!companyNamelisted){
    interviewList.push(cardInfo);
    getTotal();
}
renderInterview();
    }
}); 

const interviewSection=document.getElementById('interview-list');

function renderInterview(){
    interviewSection.innerHTML=''
    for(let interview of interviewList){
        let div =document.createElement('div')
        div.className='grid grid-cols-1 gap-5 px-1 container mx-auto mt-4'
        div.innerHTML=`
        <div class="flex justify-between p-6 bg-white rounded-lg">
                    <div>
                        <h1 class="company-name font-semibold text-[18px] text-[#002C5C]">${interview.companyName}</h1>
                        <p class="designation text-gray-700">${interview.designation}</p>

                        <div class="flex mt-3 mb-3 items-center gap-2 text-sm text-gray-700">
                            <span class="way">${interview.way}</span><i class="fa-solid fa-circle text-[5px] text-gray-400"></i>
                            <span class="time">${interview.time}</span><i class="fa-solid fa-circle text-[5px] text-gray-400"></i>
                            <span class="salary">$${interview.salary}</span>
                        </div>

                        <button class="btn-sts btn bg-[#EEF4FF] font-semibold mb-2 mt-2 text-[#002C5C]">Not Applied</button>

                        <p class="description text-sm text-gray-800 mb-5">
                            ${interview.description}
                        </p>

                        <div class="flex gap-3">
                            <button class="btn-inter btn font-semibold text-green-400 border border-green-400">Interview</button>
                            <button class="btn font-semibold text-red-400 border border-red-400">Rejected</button>
                        </div>
                    </div>

                    <div>
                        <button class="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
        `
        interviewSection.appendChild(div);
    }
    
    
}