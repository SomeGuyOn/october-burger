var Random = {}

Random.Range = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Buttons

var catButton = document.getElementById('GetCat');
var prestigeButton = document.getElementById('Prestige');
var purchaseMultButton = document.getElementById('PurchaseMult');


// Labels

var catLabel = document.getElementById('CatDiv');
var fishLabel = document.getElementById('FishDiv');
var prestigeLabel = document.getElementById('PrestigeDiv');
var goldFishLabel = document.getElementById('GoldFishDiv');

// Variables

// var fishAmount = 0;
// var catAmount = 0;
// var prestigeAmount = 0;
var catTimeout = 1000; // millseconds
var purchaseAmount = 1;

// console.log(currentDate.getSeconds())

// funky

GenGlobal(
    'fishAmount',
    0,
    (__value) => {
        return __value;
    },
    (__value, newValue) => {
        __value = (Math.round(Number(newValue)*100))/100;
        fishLabel.getElementsByClassName('thisIsASpan').innerText = "Fish: " + newValue
        return __value;
    }
)

GenGlobal(
    'catAmount',
    0,
    (__value) => {
        return __value;
    },
    (__value, newValue) => {
        __value = newValue;
        catLabel.innerText = "Cats: " + newValue;
        return __value;
    }
)

GenGlobal(
    'prestigeAmount',
    0,
    (__value) => {
        return __value;
    },
    (__value, newValue) => {
        __value = newValue;
        prestigeLabel.innerText = `Prestige: ${__value} (${__value + 1}x mult)`;
        return __value;
    }
)

GenGlobal(
    'goldFish',
    0,
    (__value) => {
        return __value;
    },
    (__value, newValue) => {
        __value = newValue;
        goldFishLabel.innerText = `Gold Fish: ${__value}`;
        return __value;
    }
)

// Functions

function PriceCalc(targetAmount) {
    targetAmount--;
    return ( Math.round(Math.pow(targetAmount, 1.14)*100)/100 )
}

function GenGlobal(Name, Default, GetFunction, SetFunction) {
    var __value = Default;

    Object.defineProperty(window, Name, {
        enumerable: true,
        configurable: true,
        get() {
            return GetFunction(__value);
        },
        set(newValue) {
            __value = SetFunction(__value, newValue);
        }
    })
}

// Code Starts Heres
catButton.addEventListener('click', () => {
    var pCatAmount = catAmount + (purchaseAmount);
    var pPurchaseAmount = purchaseAmount;

    if (purchaseAmount == 0) {
        pCatAmount = (Math.floor(Math.pow(fishAmount, 1/1.14)+1));
        pPurchaseAmount = pCatAmount - catAmount

        if (pCatAmount <= 0 || pPurchaseAmount <= 0) {
            pCatAmount = catAmount + 1
            pPurchaseAmount = 1
        }
    }

    var currentPrice = PriceCalc(pCatAmount);
    var nextPrice = PriceCalc(pCatAmount+1);

    if (currentPrice <= fishAmount) {

        fishAmount -= currentPrice;
        catAmount += pPurchaseAmount;
        catButton.innerText = "Get Cat: " + nextPrice;
    }
});

prestigeButton.addEventListener('click', () => {
    var newPrestige = Math.floor(catAmount / 10);
    
    catAmount = 0;
    fishAmount = 0;
    prestigeAmount += newPrestige;
    catButton.innerText = "Get Cat: 0";
    prestigeButton.innerText = `Prestige: ${prestigeAmount} (${prestigeAmount + 1}x mult)`
});

purchaseMultButton.addEventListener('click', () => {    
    if (purchaseAmount > 9) {
        purchaseAmount = 0;
        purchaseMultButton.innerText = `Purchase Multiplier (Max)`
    } else {
        purchaseAmount += 1;
        purchaseMultButton.innerText = `Purchase Multiplier (${purchaseAmount}x)`
    }
});
    
// intiliaze fish adder loop

(function cat() {
    fishAmount += catAmount * (1+prestigeAmount);
    // console.log(catAmount)

    if (catAmount > 50) {
        var randomAmount = Random.Range(1,5)

        if (randomAmount == 5) {
            goldFish += 1;
            console.log('got gold fish');
        }
    }
89
    setTimeout(cat, catTimeout)
})();