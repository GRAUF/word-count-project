#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';
// Function to count words in a paragraph
const countWords = (paragraph) => {
    const words = paragraph.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount = {};
    words.forEach((word) => {
        if (wordCount[word]) {
            wordCount[word]++;
        }
        else {
            wordCount[word] = 1;
        }
    });
    return wordCount;
};
// Function to display word counts in a table
const displayTable = (wordCount) => {
    const table = new Table({
        head: ['Word', 'Count'],
        colWidths: [20, 10]
    });
    Object.entries(wordCount).forEach(([word, count]) => {
        table.push([word, count]);
    });
    console.log(table.toString());
};
const main = async () => {
    const { paragraph } = await inquirer.prompt([
        {
            type: 'input',
            name: 'paragraph',
            message: 'Enter a paragraph to count the words:'
        }
    ]);
    const wordCount = countWords(paragraph);
    console.log(chalk.yellow('\nWord Count Table:'));
    displayTable(wordCount);
    const totalWords = Object.values(wordCount).reduce((sum, count) => sum + count, 0);
    console.log(chalk.green(`\nTotal words: ${totalWords}\n`));
    const { nextAction } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nextAction',
            message: 'What would you like to do next?',
            choices: ['Count words in another paragraph', 'Exit']
        }
    ]);
    if (nextAction === 'Count words in another paragraph') {
        await main();
    }
    else {
        console.log(chalk.blue('Thank you for using the word counter!'));
    }
};
main().catch(error => console.error(error));
