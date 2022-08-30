console.log('i am frome js')

const lodeDataPhone = (searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data=> displayPhone(data.data, dataLimit))
}
const displayPhone = (phones, dataLimit)=>{
  const getCardForPhone = document.getElementById('phone-container');
  getCardForPhone.innerText='';

  const showAll = document.getElementById('show-all');
  if(  dataLimit && phones.length > 20){
      phones= phones.slice(0,20);
    showAll.classList.remove('d-none')
  }
  else{
    showAll.classList.add( 'd-none' )
  }
  const noPhone = document.getElementById('warning-no-phone')
 if(phones.length == 0){
    noPhone.classList.remove('d-none')
 }
 else{
  noPhone.classList.add('d-none')
 }

     phones.forEach( phone => {
        // console.log(phone)
      const createDiv = document.createElement('div');
      createDiv.classList.add('col-3');
      createDiv.innerHTML=`
      <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Phone Name : ${phone.phone_name}</h5>
        <p class="card-text">Apple devices come with powerful apps built in. The App Store offers even more tools for almost any job.</p>
        <button onclick="loadPhoneData('${phone.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">About Phone</button>
      </div>
    </div>
      `;
      getCardForPhone.appendChild(createDiv);
  })
  togglerFun(false);
};

const procceseSreach = (dataLimit) => {
    togglerFun(true)
    const getSearhFild = document.getElementById('inputFild2');
    const searchText = getSearhFild.value;
    lodeDataPhone(searchText, dataLimit);
}
const btnSearch = () =>{

    procceseSreach(20);
}

document.getElementById('inputFild2').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        procceseSreach(20)
    }
})

const togglerFun = (isLoading)=>{
    const loaderGet = document.getElementById('loader');
    if(isLoading){
        loaderGet.classList.remove('d-none');
    }
    else{
        loaderGet.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click',function(){
  procceseSreach();
})

const loadPhoneData = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data= await res.json();
    phoneDitail(data.data);
}
const phoneDitail = (phone) => {
    console.log(phone)
    const modileTitle = document.getElementById('exampleModalLabel');
    modileTitle.innerText= phone.name;

    const modilpara1 = document.getElementById('modal1');
    modilpara1.innerText =phone.mainFeatures.storage;
    const modilpara2 = document.getElementById('modal2');
     modilpara2.innerText = phone.mainFeatures.displaySize;
    const modilpara3 = document.getElementById('modal3');
    const modilpara4 = document.getElementById('modal4');
    modilpara3.innerText = phone.releaseDate;
    modilpara4.innerText = phone.mainFeatures.chipSet;
}
lodeDataPhone('apple')
