// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract Structs 
{
    struct Todo {
        string text;
        bool completed;
    }

    // an array of 'Todo' structs
    Todo[] public todos;

    function create(string calldata _text) external {
        // 3 ways to init a struct

        //(1)
        todos.push(Todo(_text, false));

        //(2)
        // key value mapping
        //todos.push(Todo({text: _text, completed: false}));

        //(3)
        // init an empty struct and update
        /*
        Todo memory todo;
        todo.text = _text;
        todo.completed = true;
        todos.push(todo);
        */

    }

    // solidity auto creates a getter for todos
    // this function is just a sample
    function get(uint _i) external view returns (string memory text, bool completed) {
        Todo storage todo = todos[_i];
        return (todo.text, todo.completed);
    }

    function getTodos() public view returns (Todo[] memory) {
        Todo[] memory allTodos = new Todo[](todos.length); // Create a new memory array to store retrieved todos

        for (uint256 i = 0; i < todos.length; i++) {
            allTodos[i] = todos[i];
        }
        return allTodos;
    }

    function updateText(
        uint _i,
        string calldata _text
    ) external {
        Todo storage todo = todos[_i];
        todo.text = _text;
    }

    function toggleCompleted(
        uint _i
    ) external {
        Todo storage todo = todos[_i];
        todo.completed = !todo.completed;
    }

}