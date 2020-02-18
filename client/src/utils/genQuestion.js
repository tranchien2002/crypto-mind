/*eslint no-loop-func: */

import seedRamdom from 'seedrandom';
let rng;

var TreeNode = function(left, right, operator) {
  this.left = left;
  this.right = right;
  this.operator = operator;

  this.toString = function() {
    return '(' + left + ' ' + operator + ' ' + right + ')';
  };
};

function randomNumberRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomRange() {
  return parseInt(rng() * 100);
}

var x = ['/', '*', '-', '+'];

function buildTree(numNodes) {
  if (numNodes === 1) return randomRange();

  var numLeft = Math.floor(numNodes / 2);
  var leftSubTree = buildTree(numLeft);
  var numRight = Math.ceil(numNodes / 2);
  var rightSubTree = buildTree(numRight);

  var m = randomNumberRange(0, x.length);
  var str = x[m];
  return new TreeNode(leftSubTree, rightSubTree, str);
}

let simplify = (a) => {
  let s;
  let b;
  for (
    s = [], b = '';
    a !== b;
    a = b.replace(/\(([^()]*)\)(?=(.?))/, (x, y, z, p) =>
      y.indexOf('+') < 0 ? y : -s.push((b[p - 1] === '*') | (z === '*') ? x : y)
    )
  )
    b = a;
  for (b = 0; a !== b; a = b.replace(/-\d+/, (x) => s[~x])) b = a;
  return a;
};

const genQuestion = (seed, numQuestion, numElement) => {
  rng = seedRamdom(seed);
  let questions = [];
  for (let i = 0; i < numQuestion; i++) {
    // fake ans for question
    var QuesAns = {};

    QuesAns.ques = simplify(buildTree(numElement).toString());
    QuesAns.ans = [232, 132, 245, 214];
    /////

    questions.push(QuesAns);
  }
  return questions;
};

export default genQuestion;
