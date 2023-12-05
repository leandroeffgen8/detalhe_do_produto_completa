/* CARROSSEL*/
const slider = document.querySelectorAll('.images');
const thumbnail = document.querySelector('.thumbnail ul');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const containerBullets = document.querySelector('.container-bullets');

let counter = 0;
let valueIdPagination;
let quantity = 1;
let valorTotal = 0;
let textQtdaTotal = 0;

//Cria os bullets de acordo com a quantidade de slider
const createBullets = (slide, index) => {
    const htmlSpan = document.createElement('span');
    htmlSpan.classList.add('bullets');
    htmlSpan.setAttribute('data-id', (index + 1));
    containerBullets.appendChild(htmlSpan);

    let imgs = slide.querySelectorAll('img');
    
    imgs.forEach( img => {
        htmlSpan.innerHTML = `<img src="${img.src}" />`;
    });
}

slider.forEach((slide, index) => {
    //Calcula as posições dos slides
    slide.style.left = `${index * 100}%`

    //Verifica se é o primeiro e adiciona uma classe no bullets
    if( index == 1 ){
        document.querySelector('.bullets').classList.toggle('active');
    }
  
    createBullets(slide, index);
});

const bullets = document.querySelectorAll('.bullets');

//Valida e verifica quando se clica nos bullets
bullets.forEach(function(pagination, index) {
    
    pagination.addEventListener('click', function(){
        bullets.forEach(items => {
            items.classList.remove('active');
        });
        this.classList.add('active');

        checkBullets(index);
       
        slider.forEach(slide => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
    });

});

//Anterior slider
prevBtn.addEventListener('click', () =>{

    checkPagination();

    counter--;

    if( counter < 0 ){  
        counter = slider.length - 1;        
    }
   
    carrossel(counter);
    checkBullets(counter);
});

//Proximo slider
nextBtn.addEventListener('click', () =>{

    checkPagination();

    counter++;

    if( counter > slider.length - 1 ){       
        counter = 0;
    }
    carrossel(counter);    
    checkBullets(counter);
});

//Desabilita quando o prev ou next quando for o primeiro e o ultimo item
const checkBullets = (indx) => {
    if( indx < 1 ){
        prevBtn.setAttribute('disabled', true);
        prevBtn.style.opacity = '0.5';
    }else{
        prevBtn.removeAttribute('disabled');
        prevBtn.style.opacity = '1';
    }
    
    if( (indx + 1) >= slider.length ){
        nextBtn.setAttribute('disabled', true);
        nextBtn.style.opacity = '0.5';
    }else{
        nextBtn.removeAttribute('disabled');
        nextBtn.style.opacity = '1';
    }
}

//Valida os bullets quando é clicado no prev ou next
const checkPagination = () =>{
    bullets.forEach((btn) => {
        if(btn.classList.contains('active')){
            valueIdPagination = btn.dataset.id - 1;
            counter = valueIdPagination;
        }
    });
}

const carrossel = () => {    
    setPaginationBullets();
    slider.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
}

//Adiciona active quando clicado
const setPaginationBullets = () =>{
    bullets.forEach((items, indx) => {
        if( indx == counter ){
            items.classList.add('active');
        }else{
            items.classList.remove('active');
        }
    });
}

/*AVALIAÇÃO*/
const stars = document.querySelectorAll('.icon-stars');
const starsValues = document.querySelector('#starsValues');

let currentValue = 0;

stars.forEach( star => {
    star.addEventListener('mouseover', () => {
        const value = star.getAttribute('data-star');
        addValue(value);
    });

    star.addEventListener('mouseout', () => {
        removeValue(); 
    });

    star.addEventListener('click', () => {
        const value = star.getAttribute('data-star');
        currentValue = value;
        starsValues.textContent = currentValue;
    })
});

const addValue = (value) => {
    for( let i = 0; i < stars.length; i++ ){
        i < value ? `${stars[i].classList.add('active')}` : `${stars[i].classList.remove('active')}`;
    }
}

const removeValue = () => {
    stars.forEach( star => {
        star.classList.remove('active');
    });
    addValue(currentValue)
}

/*VARIATION*/
const listColor = document.querySelectorAll('.list-color li');
const listSize = document.querySelectorAll('.list-size li');
const listColorKit = document.querySelectorAll('.list-color-kit li');

const variation = document.querySelectorAll('.variation');

const calcPriceVariation = (e) => {
    const element = e.target;
    const dataValor = element.getAttribute('data-valor');
    const htmlPrice = document.querySelector('.price');
    htmlPrice.textContent = `R$ ${formatReal(dataValor)}`;
    htmlPrice.setAttribute('data-price', dataValor);
    htmlPrice.setAttribute('data-total', dataValor);
}

const calcPercent = (e) => {
    const item = e.target;
    const price = document.querySelector('.price');
    const priceProdut = parseInt(price.getAttribute('data-total'));
    const minParcel = parseInt(price.getAttribute('data-parcel-min'));

    const numParcel = document.querySelector('.numParcel');
    const valueTotal = document.querySelector('.valueTotal');
    let allParcel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    allParcel.forEach( (all, element ) => {
        let parcel = parseInt( priceProdut / element );
        
        if( minParcel <= parcel ){
            numParcel.textContent = `${element}x`;
            valueTotal.textContent = `${formatReal(parcel)}`;
        }
    });

}

const variantionCombination = (e) => {
    
    const item = e.target;
    const itemActive = item.parentElement;

    if( itemActive.classList.contains('list-color') ){
        const groups = item.getAttribute('data-group');
        const element = groups.split('|');
        
        const valueLabel = document.querySelector('.label .tamanho');
        valueLabel.textContent = '';

        const num = document.querySelector('.inputQuantity');
        if( num.value > 1 ){
            quantity = 1;
            num.value = "1";
        }

        listColor.forEach( cor => {
            cor.classList.remove('active');
        })

        listSize.forEach( tam => {
            tam.classList.remove('visibled');
            tam.classList.remove('active');
        });

        calcPriceVariation(e);
        calcPercent(e);
    
        for( let i = 0; i < element.length; i++ ){
            let items = element[i];
            
            item.classList.add('active');
            
            for( let x = 0; x < listSize.length; x++ ){
                let tam = listSize[x].textContent;
                listSize[x].parentElement.classList.add('active');
                if( items == tam ){
                    listSize[x].classList.add('visibled');                    
                }
            }
            
        }
    }else{
        listSize.forEach( tam => {
            tam.classList.remove('active');
        });        
        item.classList.add('active');
    }
}

const selectedItems = (e) => {
    const item = e.target;
    const element = item.parentElement.parentElement;
    
    const label = element.querySelector('.label .selected');
    
    if( label ){
        const selected = item.textContent;
        label.textContent = selected;
        variantionCombination(e);
    }    
}

variation.forEach( li => {
    const list = li.querySelectorAll('.list');
    list.forEach( ul => {
        const items = ul.querySelectorAll('.item');
        items.forEach( item => {
            item.addEventListener('click', selectedItems);
        });
    });
});

listColor.forEach( cor => {
    let color = cor.getAttribute('data-color');
    cor.setAttribute('style', `background-color:${color}`);
});

listColorKit.forEach( cor => {
    let color = cor.getAttribute('data-color');
    cor.setAttribute('style', `background-color:${color}`);
});

/*MODAL*/
const modal = document.querySelector('.modal');
const tableMedida = document.querySelector('.table-medida span');
const modalMedida = document.querySelector('.modal-medida');
const close = document.querySelector('.close');

const openModal = () => {
    modal.classList.add('active')
    setTimeout( () => {
        modalMedida.classList.add('active');
    },200);
}

const closeModal = () => {
    modalMedida.classList.remove('active');
    setTimeout( () => {
        modal.classList.remove('active')
    },400);
}

close.addEventListener('click', closeModal);
tableMedida.addEventListener('click', openModal);

//FORMATA MOEDA
function formatReal( int ){
    var tmp = int+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return tmp;
};

/*QUANTIDADE*/

const qtdaMinus = document.querySelector('.btn-minus');
const qtdaPlus = document.querySelector('.btn-plus');
const htmlPrice = document.querySelector('.price');
const inputQuantity = document.querySelector('.inputQuantity');

let textNum = htmlPrice.textContent;
let num = textNum.replace('R$', '').replace(',', '').trim();
htmlPrice.setAttribute('data-price', num);

const buttonPlus = (e) => {
    
    const htmlPrice = document.querySelector('.price');
    const price = parseInt(htmlPrice.getAttribute('data-price'));

    quantity++; 
    inputQuantity.value = quantity;

    valorTotal = quantity * price;
    
    htmlPrice.setAttribute('data-total', valorTotal);
    htmlPrice.textContent = `R$ ${formatReal(valorTotal)}`;

    calcPercent(e);
}

const buttonMinus = (e) => {
    if( quantity > 1 ){
        quantity--;
        inputQuantity.value = quantity;

        const htmlPrice = document.querySelector('.price');
        const price = parseInt(htmlPrice.getAttribute('data-price'));
        let dataTotal = parseInt(htmlPrice.getAttribute('data-total'));

        valorTotal = dataTotal - price;

        htmlPrice.setAttribute('data-total', valorTotal);
        htmlPrice.textContent = `R$ ${formatReal(valorTotal)}`;
    }  
    
    calcPercent(e);
}

qtdaPlus.addEventListener('click', buttonPlus);
qtdaMinus.addEventListener('click', buttonMinus);

/*ADICIONAR AO CARRINHO*/
const addProduct = document.querySelector('#addProduct');
const elTitle = document.querySelector('.grid-right h1');
const elPrice = document.querySelector('.price');
const elColor = document.querySelector('.label .cor');
const elSize = document.querySelector('.label .tamanho');
const elQtda = document.querySelector('.inputQuantity');
const bodyMinicart = document.querySelector('.bodyMinicart');

const requestPost = () => {
    const id = new Date().getTime().toString();

    let items = {
        name: elTitle.textContent,
        price: elPrice.textContent,
        color: elColor.textContent,
        size: elSize.textContent,
        qtda: elQtda.value,
        id: id
    };

    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(items)
    })
    .then(response => {
        if (response.ok) {
            createProduct(items);
            validadeMsg();
            
        } else {
            console.error("Erro ao adicionar o produto. Status: " + response.status);
        }
    })
    .catch(error => {
        console.error("Erro na requisição: " + error);
    });
}

//MONTA O HTML DO PRODUTO NO MINI CART
const createProduct = (items) => {
    const gridProduct = document.createElement('div');
    gridProduct.classList.add('grid-product');
    const color = document.querySelector('.list-color .item.active');
    let selectedColor = color.getAttribute('data-color');
    const elUnit = document.querySelector('.content-price span');
    const priceUnit = elUnit.getAttribute('data-price');
    let dataTotal = parseInt(elUnit.getAttribute('data-total'));
    
    gridProduct.innerHTML = `
        <div class="list-product" data-id="${items.id}">
            <div class="image" style="background:${selectedColor}"></div>
            <div class="description">
                <h2>${items.name}</h2>
                <span class="variation">${items.color} / ${items.size}</span>
                <span class="price" data-price="${priceUnit}" data-total="${dataTotal}">${items.price}</span>
                <div class="item-qtda">
                    <button type="button" class="btn btn-minus" data-id="minus">-</button>
                    <input type="text" class="input-qtda" value="${items.qtda}" min="1">
                    <button type="button" class="btn btn-plus" data-id="plus">+</button>
                </div>
            </div>                    
        </div>
        <span class="close" data-id="${items.id}">X</span>
    `;
  
    bodyMinicart.appendChild(gridProduct);

    const priceTotal = document.querySelector('.priceTotal');
    priceTotal.textContent = `${items.price}`;
    priceTotal.setAttribute('data-total', items.price.replace('R$', '').replace(',', '').trim());

    const itemQtda = gridProduct.querySelector('.item-qtda')
    itemQtda.addEventListener('click', calcTotal);  

    const btnExcluir = gridProduct.querySelector('.close');
    btnExcluir.addEventListener('click', excluir);

    valideDisabled();
    somaTotalProduct();
    quantidadeTotal();
    
}

const valideDisabled = () => {
    const inputQtda = document.querySelectorAll('.input-qtda');
   
    inputQtda.forEach( qtda => {
        const element = qtda.parentElement;
        const btnMinus = element.querySelector('.item-qtda .btn-minus');
        if( parseInt(qtda.value) == 1 ){
            btnMinus.disabled = true;
        }
    }); 

}

const quantidadeTotal = () => {
    const qtdaTotalCart = document.querySelector('.qtdaTotal');
    const grid = document.querySelectorAll('.grid-product');
    let qtdaTotal = [];

    grid.forEach( el => {
        const inputQtda = el.querySelector('.input-qtda');
        const qtda = parseInt(inputQtda.value);
        qtdaTotal.push(qtda);
    });

    textQtdaTotal = qtdaTotal.reduce((acumulador, valor) => acumulador + valor, 0);
    qtdaTotalCart.textContent = `${textQtdaTotal}`;
}

const calcValueTotal = (e) => {
    const item = e.target.parentElement.parentElement.parentElement;
    const priceTotal = document.querySelector('.priceTotal');
    const grid = document.querySelectorAll('.grid-product');
    
    let result = [];

    grid.forEach( el => {
        const inputQtda = el.querySelector('.input-qtda');
        const element = el.querySelector('.price');
        const elPrice = item.querySelector('.price');
        const price = parseInt(elPrice.getAttribute('data-total'));
        const elemPrice = parseInt(element.getAttribute('data-total'));
        result.push(elemPrice);
    });
    
    valorTotal = result.reduce((acumulador, valor) => acumulador + valor, 0);
    priceTotal.textContent = `R$ ${formatReal(valorTotal)}`;

    quantidadeTotal();
}

const elemQtda = (e) => {
    const item = e.target.parentElement.parentElement;
    const inputQtda = item.querySelector('.input-qtda');
    const elPrice = item.querySelector('.description .price');
    const price = parseInt(elPrice.getAttribute('data-price')); 
    const btnMinus = item.querySelector('.btn-minus');
    let qtda;

    if( e.target.type == 'button' ){
        const action = e.target.dataset.id;
        if( action == 'plus' ){
            inputQtda.value = parseInt(inputQtda.value) + 1;
            qtda = parseInt(inputQtda.value);

            if( qtda > 1 ){
                btnMinus.disabled = false;
            }

            valorTotal = qtda * price;
            elPrice.setAttribute('data-total', valorTotal);
            elPrice.textContent = `R$ ${formatReal(valorTotal)}`;
            
        }else{
            inputQtda.value = parseInt(inputQtda.value) - 1;
            const dataTotal = parseInt(elPrice.getAttribute('data-total'));
            qtda = parseInt(inputQtda.value);

            if( qtda == 1 ){
                btnMinus.disabled = true;
            }

            valorTotal = dataTotal - price;
            elPrice.setAttribute('data-total', valorTotal);
            elPrice.textContent = `R$ ${formatReal(valorTotal)}`;
        }
    }

    calcValueTotal(e);

    progress();
}

const buttonPlusMiniCart = (e) => elemQtda(e);
const buttonMinusMiniCart = (e) => elemQtda(e);

const somaTotalProduct = () => {
    const priceTotal = document.querySelector('.priceTotal');    
    const gridProduct = document.querySelectorAll('.grid-product');
    let soma = 0;

    for( let i = 0; i < gridProduct.length; i++ ){
        const items = gridProduct[i];
        const price = items.querySelector('.price');
        const dataPrice = parseInt(price.getAttribute('data-total'));
        soma += dataPrice;
    }

    priceTotal.textContent = `R$ ${formatReal(soma)}`; 

}

const calcTotal = (e) => {
    if( e.target.type == 'button' ){
        const action = e.target.dataset.id;
        action == 'plus' ? buttonPlusMiniCart(e) : buttonMinusMiniCart(e);
    }  
    
    update(e);
}

//ADICIONA PRODUTO NO CARRINHO
const addCart = () => {
    const label = document.querySelectorAll('.label span');
    let flag = false;
    let color, size;
    debugger
    label.forEach( span => {
        if( span.textContent === '' ) flag = true;
        if( span.classList.contains('cor') ) color = span.textContent;
        if( span.classList.contains('tamanho') ) size = span.textContent;
    });

    if( flag ){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            html: `Escolha as opções de <strong>cor</strong> e <strong>tamanho</strong>!`
        }); 
        return false;
    }else{
        openMiniCart();
        requestPost(); 
              
    }
}

/* ATUALIZAR PRODUTO MINICART */
const update = (e) => {
    const item = e.target.parentElement.parentElement.parentElement;
    const id = parseInt(item.getAttribute('data-id'));
    let price = item.querySelector('.list-product .price');
    let qtda = item.querySelector('.list-product .input-qtda');

    const items = {
        name: elTitle.textContent,
        price: price.textContent,
        color: elColor.textContent,
        size: elSize.textContent,
        qtda: qtda.value,
        id: id
    };

    const options = {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(items)
    }

    fetch(`http://localhost:3000/tasks/${id}`, options)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        console.log('Produto atualizado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao atualizar o produto:', error);
    });
}

/* EXCLUIR PRODUTO MINICART */
const excluir = (e) => {
    const item = e.target;
    const id = parseInt(item.getAttribute('data-id'));

    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Produto deletado com sucesso');
            item.parentElement.remove();
            validadeMsg();
            somaTotalProduct();
            quantidadeTotal();
            progress();
        } else {
            console.error('Erro ao deletar o produto');
        }
    })
    .catch(error => {
        console.error('Ocorreu um erro na requisição:', error);
    });
}

//VALIDA SE TEM ALGUM PRODUTO NO CARRINHO
const validadeMsg = () => {
    const list = document.querySelectorAll('.grid-product');
    const title = document.querySelector('.bodyMinicart .title');
    const containerProgress = document.querySelector('.container-progress');
    const qtdTotal = document.querySelector('.headerMinicart .qtdaTotal');
    const priceTotal = document.querySelector('.totalMinicart .priceTotal');

    if( list.length <= 0 ){
        title.parentElement.classList.add('scroll-hidden');
        title.classList.remove('hide');
        containerProgress.classList.add('hide'); 
        qtdTotal.textContent = '0';
        priceTotal.textContent = 'R$ 0,00';
    }else{
        title.classList.add('hide');
        title.parentElement.classList.remove('scroll-hidden')
    }
}

addProduct.addEventListener('click', addCart);

/*MINICART*/
const miniCart = document.querySelector('.miniCart');
const miniCartClose = document.querySelector('.miniCartClose');


const openMiniCart = () => {
    modal.classList.add('active');
    setTimeout( () => {
        
        if( document.querySelector('.grid-product') == null ){
            document.querySelector('.bodyMinicart .title').classList.remove('hide');
            document.querySelector('.container-progress').classList.add('hide');
        }else{
            document.querySelector('.container-progress').classList.remove('hide'); 
            document.querySelector('.bodyMinicart .title').classList.add('hide');           
        }

        miniCart.classList.add('active');
        progress();

        
    },500);
}

const closeMiniCart = () => {
    miniCart.classList.remove('active');
    setTimeout( () => {
        modal.classList.remove('active');
    },300); 
}

miniCartClose.addEventListener('click', closeMiniCart);


/*MONTE SEU KIT*/

const itensKit = document.querySelectorAll('.itens-kit');
let result = [];

const selectedkit = (e) => {
    const htmlProd = e.target.parentElement.parentElement.parentElement;
    htmlProd.classList.add('selected');
    const item = e.target
    const itemActive = e.target.parentElement;

    const colorKit = htmlProd.querySelectorAll('.list-color-kit li');
    const sizeKit = htmlProd.querySelectorAll('.list-size-kit li');
  
    const variationProduct = `${item.textContent}`;
    result.push(variationProduct);    

    if( itemActive.classList.contains('list-color-kit') ){

        const groups = item.getAttribute('data-group');
        const element = groups.split('|');

        colorKit.forEach( cor => {
            cor.classList.remove('active');
        })

        sizeKit.forEach( tam => {
            tam.classList.remove('visibled');
            tam.classList.remove('active');
        });

        for( let i = 0; i < element.length; i++ ){
            let items = element[i];

            item.classList.add('active');

            for( let x = 0; x < sizeKit.length; x++ ){
                let tam = sizeKit[x].textContent;
                sizeKit[x].parentElement.classList.add('active');
                if( items == tam ){
                    sizeKit[x].classList.add('visibled');
                }
            }
        }
    }else{
        sizeKit.forEach( tam => {
            tam.classList.remove('active');
        });        
        item.classList.add('active');
    }
}

itensKit.forEach(kit => {
    const variation = kit.querySelectorAll('.variation');
   
    variation.forEach( ul => {
        const items = ul.querySelectorAll('.item');
        items.forEach( item => {
            item.addEventListener('click', selectedkit);
        });
    });
});

const monteSeuKit = document.querySelector('#addkit');

const addKit = () => {
    const lists = document.querySelectorAll('.itens-kit .list li');
    let flag = false;

    lists.forEach( list => {
        if( list.classList.contains('active') ){
            flag = true;
        }
    })

    if( !flag ){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            html: `Escolha uma das opções!!`
        }); 
        return false;
    }else{
        const monteKit = document.querySelectorAll('.itens-kit.selected');
        let kit = false;

        for( let i = 0; i < monteKit.length; i++ ){ 
            if( monteKit.length <= 1 ){             
                Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    html: `Apenas acima de 2 produtos para montar o kit`
                });
            }else{
                kit = true;
            }
        }
       
        let total = [];

        if( kit ){
            Swal.fire({
                icon: 'success',
                title: 'Meus parabéns!!!',
                html: `Seu kit foi montado com sucesso!`
            }).then(() => {
                let itensKit = document.querySelectorAll('.itens-kit')                
                let list = document.querySelectorAll('.itens-kit .list');

                itensKit.forEach( kit => {
                    
                    const elColor = kit.querySelectorAll('.list-color-kit .item');
                    const elSize = kit.querySelectorAll('.list-size-kit .item');

                    let color = '';
                    let size = '';

                    elColor.forEach( cor => {
                        if( cor.classList.contains('active') ){
                            color = cor.textContent
                        }
                    })

                    elSize.forEach( tam => {
                        if( tam.classList.contains('active') ){
                            size = tam.textContent
                        }
                    })

                    let totalSelected = [];                  

                    if( kit.classList.contains('selected') ){
                        
                        const textColor = color;
                        const textSize = size;
                        const title = kit.querySelector('h3').textContent;
                        const value = kit.querySelector('.item.active');
                        const dataValue = value.getAttribute('data-valor');
                        const dataColor = value.getAttribute('data-color');
                        totalSelected.push(title, textColor, textSize, dataColor, dataValue);

                        total.push(totalSelected);
                    }
                });

                kitMontado(total);
                
                list.forEach(item => {
                    const selected = item.parentElement.parentElement;
                    selected.classList.remove('selected');
                    const element = item.querySelectorAll('.item');
                    
                    element.forEach(el => {
                        el.classList.remove('active');
                    })
                  
               })
            }); 
        }   
    }
}

const kitMontado = (item) => {
    const addKit = document.querySelector('.addKit');

    const section = document.createElement('section');
    section.classList.add('kit-add');
    
    for( let i = 0; i < item.length; i++ ){
        section.innerHTML += `
            <div class="grid-container-kit" data-color="${item[i][1]}" data-valor="${item[i][4]}">
                <ul class="grid-label">
                    <li>
                        <span class="label">Produto escolhido</span>
                        <span class="information title">${item[i][0]}</span>
                    </li>
                    <li>
                        <span class="label">Cor escolhida</span>
                        <span class="information color">${item[i][1]} <span class="grid-color" style="background-color:${item[i][3]}"></span> </span>
                    </li>
                    <li>
                        <span class="label">Tamanho escolhido</span>
                        <span class="information size">${item[i][2]}</span>
                    </li>
                    <li>
                        <span class="label">Preço</span>
                        <span class="information price">R$ ${formatReal(item[i][4])}</span>
                    </li>
                    <li style="line-height: 4">
                        <button class="btn btn-excluir">excluir</button>
                    </li>
                </ul>
            </div> 
        `;
        
        addKit.appendChild(section);
        addKit.classList.remove('hide');
    }
}

monteSeuKit.addEventListener('click', addKit);

const addCartKit = document.querySelector('#addCartKit');

const adicionarKitCarrinho = () => {
    
    openMiniCart();

    const id = new Date().getTime().toString();

    const bodyMinicart = document.querySelector('.bodyMinicart');
    
    const kitAdd = document.querySelector('.kit-add');
    const gridContainerKit = document.querySelectorAll('.grid-container-kit');

    const divKit = document.createElement('div');
    divKit.classList.add('container-kit'); 
    divKit.setAttribute('data-id', id);

    const container = document.createElement('div');
    container.classList.add('container-box');

    const containerDivImg = document.createElement('div');
    containerDivImg.classList.add('container-box-img');
    const containerImg = document.createElement('img');
    containerImg.src = `https://placehold.co/100x100?text=kit`;

    const btnClose = document.createElement('span');
    btnClose.setAttribute('data-id', id);
    btnClose.classList.add('close');
    btnClose.textContent = 'X';

    containerDivImg.appendChild(containerImg);
    container.appendChild(btnClose);

    divKit.appendChild(containerDivImg);
    bodyMinicart.appendChild(divKit);
    divKit.appendChild(container);

    gridContainerKit.forEach( (kit, index) => {
        const gridProduct = document.createElement('div');
        gridProduct.classList.add('grid-product');
        gridProduct.classList.add('kit');
        const title = kit.querySelector('.grid-label .title').textContent;
        const color = kit.querySelector('.grid-label .color').textContent;
        const size = kit.querySelector('.grid-label .size').textContent;
        const elPrice = kit.querySelector('.grid-label .price');
        const price = elPrice.textContent;
        const newPrice = price.replace('R$', '').replace(',', '').trim();
  
        gridProduct.innerHTML = `
            <div class="list-product">
                <div class="description">
                    <h2>${title}</h2>
                    <span class="variation">${color} / ${size}</span>
                    <span class="price" data-price="${newPrice}" data-total="${newPrice}">${price}</span>
                    <div class="item-qtda">
                        <button type="button" class="btn btn-minus" data-id="minus">-</button>
                        <input type="text" class="input-qtda" value="1" min="1">
                        <button type="button" class="btn btn-plus" data-id="plus">+</button>
                    </div>
                </div>                             
            </div>             
        `;
       
        container.appendChild(gridProduct); 
        kitAdd.remove();
        document.querySelector('.addKit').classList.add('hide');

        // const variationList = document.querySelectorAll('.itens-kit .variation .list .item');

        // variationList.forEach( item => {
        //     item.classList.remove('active');
        // })

        somaTotalProduct();
        quantidadeTotal();

        const btnExcluirKit = divKit.querySelector('.close');
        btnExcluirKit.addEventListener('click', excluirKit);
    });
}

/* EXCLUIR PRODUTO MINICART */
const excluirKit = (e) => {
    const item = e.target.parentElement.parentElement;
    item.remove();
    validadeMsg();
    somaTotalProduct();
    quantidadeTotal();
    progress();
}

addCartKit.addEventListener('click', adicionarKitCarrinho);


/*PROGRESS*/
const progress = () => {
    const limiteCompra = document.querySelector('#limiteCompra');
    const valuePercent = parseInt(limiteCompra.textContent.replace('R$', '').replaceAll(',', '').replace('.', '').trim());
    const elValueTotal = document.querySelector('.totalMinicart .priceTotal');
    const valueTotal = parseInt(elValueTotal.textContent.replace('R$', '').replaceAll(',','').replaceAll('.','').trim());
    const progressBar = document.querySelector('.progress-bar span');
    const msgFrete = document.querySelector('.container-progress .msg-frete');
    const msgWin = document.querySelector('.container-progress .msg-win');
    const valueRestant = document.querySelector('.valueRestant');
    const elValueRestantFinal = document.querySelector('#valueRestantFinal');
    
    let value = 0;
    let perc = 0;

    value = valuePercent - valueTotal;
    perc = ( valueTotal / valuePercent) * 100;

    if( value <= 0 ){
        progressBar.style.width = '100%';
        setTimeout( () => {
            msgFrete.classList.add('hide');
            valueRestant.classList.add('hide');
            msgWin.classList.remove('hide');            
        },1500);
    }else{
        progressBar.style.width = `calc(${perc}%)`;
        elValueRestantFinal.textContent = `R$ ${formatReal(value)}`;
        valueRestant.classList.remove('hide');
        msgFrete.classList.remove('hide');
        msgWin.classList.add('hide');
    }
}




