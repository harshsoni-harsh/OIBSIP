// const {evaluate} = require('mathjs');
// let input = document.getElementById("input");
// let output = document.getElementById("output");
let b;
let op = "";
document.getElementById("grid").addEventListener("click", (e)=>
{
    op = input.value;
    b = e.target.textContent;
    output.textContent = "";
    if(b.length > 5){}
    else if(b === "ans" || b==="Enter")
    {
        output.textContent = math.evaluate(input.value);
    }
    else if(b === "clear")
    {
        input.value = "";
        op = "";
    }
    else if(b === "del")
    {
        if(op.length > 0)
        {
            op = op.slice(0,op.length-1)
            input.value = op;
        }
    }
    else if(b === "√")
    {
        op += `sqrt(${op})`;
        input.value = op;
    }
    else
    {
        op += b;
        input.value = op;
    }
});