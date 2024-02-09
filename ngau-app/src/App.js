import React, { useState } from 'react';
import './style.css';

const NgauCalculator = () => {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [variantsOutput, setVariantsOutput] = useState([]);

    const addNumber = (number) => {
        if (selectedNumbers.length < 5) {
            setSelectedNumbers([...selectedNumbers, number]);
        } else {
            alert("You can only select up to 5 numbers.");
        }
    };

    const clearNumbers = () => {
        setSelectedNumbers([]);
    };

    const updateSelectedNumbers = () => {
        const targetSums = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
        const variantsngau = generateVariants(selectedNumbers);

        const finallist2 = [];
        for (let variant of variantsngau) {
            const combos = findTriplets(variant, targetSums);
            finallist2.push(variant);
            for (let combo of combos) {
                const sumtwo = compareListsRemoveOccurrences(variant, combo);
                const sum = sumtwo.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
                finallist2.push(combo);
                finallist2.push(sumtwo);
                finallist2.push([sum]);
            }
        }

        setVariantsOutput(finallist2);
        compareLargest(finallist2);
    };

    const removeDuplicateArrays = (nestedArray) => {
        const uniqueArrays = new Set();

        const filteredArray = nestedArray.filter((arr) => {
            const stringifiedArray = JSON.stringify(arr);
            if (!uniqueArrays.has(stringifiedArray)) {
                uniqueArrays.add(stringifiedArray);
                return true;
            }
            return false;
        });

        return filteredArray;
    };

    const generateVariants = (array) => {
        const variantsSet = new Set();

        variantsSet.add(array.slice().sort());

        for (let i = 0; i < array.length; i++) {
            const variant1 = array.slice();

            if (variant1[i] === 3) {
                variant1[i] = 6;
            } else if (variant1[i] === 6) {
                variant1[i] = 3;
            }

            variantsSet.add(variant1.slice().sort());
        }

        const variants = [...variantsSet];
        const removedduplicates = removeDuplicateArrays(variants);
        return removedduplicates;
    };

    const findTriplets = (initialNumbers, targetNumbers) => {
        const result = [];

        for (let i = 0; i < initialNumbers.length - 2; i++) {
            for (let j = i + 1; j < initialNumbers.length - 1; j++) {
                for (let k = j + 1; k < initialNumbers.length; k++) {
                    const sum = initialNumbers[i] + initialNumbers[j] + initialNumbers[k];

                    if (targetNumbers.includes(sum)) {
                        result.push([initialNumbers[i], initialNumbers[j], initialNumbers[k]]);
                    }
                }
            }
        }

        return result;
    };

    const compareListsRemoveOccurrences = (list1, list2) => {
        const occurrences = [...list1];

        for (let item of list2) {
            const index = occurrences.indexOf(item);
            if (index !== -1) {
                occurrences.splice(index, 1);
            }
        }

        return occurrences;
    };

    const compareLargest = (array) => {
        let maximum = 0;
        let biggest = false;
        let donggu = false;
        let bouyin = false;
        let boubou = false;
        let tendian = false;

        for (let i = 0; i < array.length; i++) {
            if (array[i].length === 2) {
                if ((array[i][0] === 20 || array[i][0] === 30 || array[i][0] === 40) && array[i][1] === 11) {
                    donggu = true;
                }

                if ((array[i][1] === 20 || array[i][1] === 30 || array[i][1] === 40) && array[i][0] === 11) {
                    donggu = true;
                }
                if ((array[i][0] === 1 || array[i][0] === 11) && (array[i][1] === 1 || array[i][1] === 11)) {
                    bouyin = true;
                }
                if (array[i][0] === array[i][1]) {
                    boubou = true;
                }
            }
            if (array[i].length === 1) {
                if (array[i][0].toString().length === 2) {
                    const numberString = array[i][0].toString();
                    const digit1 = parseInt(numberString.charAt(0));
                    const digit2 = parseInt(numberString.charAt(1));
                    if (digit2 === 0) {
                        tendian = true;
                        maximum = array[i][0];
                    }
                    if (digit2 > maximum) {
                        maximum = digit2;
                    }

                } else {
                    if (array[i][0] > maximum) {
                        maximum = array[i][0];
                    }
                }
            }
        }
        if (donggu) {
            alert("Jesus Christ! You get Dong GU 5x");
        } else if (bouyin) {
            alert("Congratulations! You get Bou Aces 4x");

        } else if (boubou) {
            alert("Congratulations! You get Bou Bou 3x");

        } else if (tendian) {
            alert("Congrats! You Get 10 dian 2x");
        } else {
            alert("Erm u get " + maximum + " dian");
        }
    };

    return (
        <div className="calc" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Ngau Calculator</h2>
            <label htmlFor="selectedNumbers">Select Numbers:</label>
            <div id="selectedNumbers" className="output">
                {selectedNumbers.join(', ')}
            </div>
            <div className="calc_button">
                <button onClick={() => addNumber(1)}>1</button>
                <button onClick={() => addNumber(2)}>2</button>
                <button onClick={() => addNumber(3)}>3</button>
                <button onClick={() => addNumber(4)}>4</button>
                <button onClick={() => addNumber(5)}>5</button>
                <button onClick={() => addNumber(6)}>6</button>
                <button onClick={() => addNumber(7)}>7</button>
                <button onClick={() => addNumber(8)}>8</button>
                <button onClick={() => addNumber(9)}>9</button>
                <button onClick={() => addNumber(10)}>10</button>
                <button onClick={() => addNumber(20)}>J</button>
                <button onClick={() => addNumber(30)}>Q</button>
                <button onClick={() => addNumber(40)}>K</button>
                <button style={{ fontSize: '30px' }} onClick={() => addNumber(11)}>&#9824;</button>
                <button onClick={clearNumbers}>Clear Numbers</button>
                <button onClick={updateSelectedNumbers}>Calculate</button>
            </div>
            <div>
                <h3>Results</h3>
                <div id="variantsOutput">
                    {/* Render variantsOutput here */}
                </div>
            </div>
        </div>
    );
    };

export default NgauCalculator;
