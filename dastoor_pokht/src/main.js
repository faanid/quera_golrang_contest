function prepare(items, nextStep) {
    return new Promise((complete) => {
        console.log(`Dar hale amade sazi: ${items.join(", ")}`);
        setTimeout(() => {
            complete(nextStep("preparing"));
        }, 500);
    });
}

function cooking(nextStep) {
    return new Promise((complete) => {
        console.log("dar hale anjam");
        setTimeout(() => {
            complete(nextStep("making"));
        }, 2000);
    });
}

function serve(nextStep) {
    return new Promise((complete) => {
        console.log("put some food ");
        setTimeout(() => {
            complete(nextStep("serving"));
        }, 500);
    });
}

function eat(nextStep) {
    return new Promise((complete) => {
        console.log("enjoy!!");
        setTimeout(() => {
            complete(nextStep("eating"));
        }, 1000);
    });
}

function doneMessage(step) {
    console.log(`${step} next step...`);
    return `${step} next step...`;
}

function startCooking(ingredients) {
    prepare(ingredients, doneMessage)
        .then(() => cooking(doneMessage))
        .then(() => serve(doneMessage))
        .then(() => eat(doneMessage))
        .then(() => console.log("Anjam shod!"))
        .catch((err) => console.error("Error", err));
}

module.exports = { prepare, cooking, serve, eat, doneMessage };
