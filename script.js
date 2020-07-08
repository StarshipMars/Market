
let run = function(){

            let volumes = document.querySelectorAll('input[type="radio"]'),
                boxes = document.querySelectorAll('.item'),
                colorList = document.querySelectorAll('.colors'),
                minusQuantity = document.querySelectorAll('.minus'),
                plusQuantity = document.querySelectorAll('.plus'),
                buttons = document.querySelectorAll('.buy'),
                colorState = false,
                bgImages = ['oil','pantene','concept'];


                /* функция changeValue - меняет стоимость в зависимости от выбранного обьема */

            for(let volume of volumes){
                volume.addEventListener('change', changeValue)
            }

            function changeValue(event){
                let currentValue = event.target.dataset.value;
                let quantity = event.target.closest('.row_4').nextElementSibling.children[0].children[1].innerHTML;
                let cost = event.target.closest('.row_4').previousElementSibling.children[1];
                
                cost.innerHTML = `${+(currentValue) * +(quantity)} грн`;   
            }







            /* функция showDropList - показывает выпадающий список с цветами */

            for(let color of colorList){
                color.addEventListener('click', showDropList)
            }


            function showDropList(){
                this.nextElementSibling.classList.add('show-colors')
                this.classList.add('modify')
                colorState = true;
                
                this.addEventListener('click', hideDropList);
                this.removeEventListener('click', showDropList);

            }


            /* функция hideDropList - скрывает выпадающий список с цветами */

            function hideDropList(){
                this.nextElementSibling.classList.remove('show-colors');
                this.classList.remove('modify')
                colorState = false;
            
                this.addEventListener('click', showDropList);
                this.removeEventListener('click', hideDropList); 

            }





            /* функция showImage - при наведении на блок меняет картинку */

            for(let box of boxes){
                box.addEventListener('mouseenter', showImage)
            }

            function showImage(){
                let image = this.querySelector('.image');
                let imageName = image.getAttribute('name');
                
                bgImages.forEach((name)=>{
                    if(name == imageName){
                        image.classList.toggle(`${name}_2`)
                    }
                })
                
                this.classList.add('hover')
                this.removeEventListener('mouseenter', showImage)
                this.addEventListener('mouseleave', hideImage)
            }



            
            /* функция hideImage - меняет картинку когда курсор покидает блок */

            function hideImage(){
                if(colorState){
                    this.querySelector('.drop-list').classList.remove('show-colors')
                    this.querySelector('.colors').classList.remove('modify')
                    colorState = false;
                }
                this.classList.remove('hover')
                this.removeEventListener('mouseleave', hideImage)
                this.addEventListener('mouseenter', showImage)
                
                let image = this.querySelector('.image');
                let imageName = image.getAttribute('name');
                
                bgImages.forEach((name)=>{
                    if(name == imageName){
                        image.classList.toggle(`${name}_2`)
                    }
                })
                
            }




            /* функция reduce - уменьшает количество выбранного товара */

            for(let each of minusQuantity){
                each.addEventListener('click', reduce)
            }

            function reduce(event){
                let quantity = event.target.nextElementSibling;
                let value = +quantity.innerHTML;

                if(value == 0){
                    return
                }

                quantity.innerHTML = `${value - 1}`;
                getValue(event.target, quantity)


            }



            /* функция increase - увеличивает количество выбранного товара */

            for(let elem of plusQuantity){
                elem.addEventListener('click', increase)
            }


            function increase(event){
                let quantity = event.target.previousElementSibling;
                let value = +quantity.innerHTML;

                quantity.innerHTML = `${value + 1}`;
                getValue(event.target, quantity)

            }


            /* функция getValue - при смене количества товара пересчитывает стоимость */

            function getValue(aim, count){
                let price = aim.closest('.row_5').previousElementSibling.previousElementSibling.children[1];
                let checkedVolume = aim.closest('.row_5').previousElementSibling.children;
                let value = count.innerHTML;
                

                Array.from(checkedVolume).forEach((item)=>{
                    let input = item.firstChild;
                    if(input.checked){
                    let cost = input.dataset.value;
                    price.innerHTML = `${+(cost) * +(value)} грн`;
                    }
                })

            }



            /* функция boughtProduct - нажатие на кнопку "Купить" */

            buttons.forEach((button)=>{
                button .addEventListener('click', boughtProduct)
            })

            function boughtProduct(){
                    this.classList.add('btn_active')
                let sign = this.closest(".item").querySelector('.weights');
                    sign.classList.add('ready');
            }

}

run()
