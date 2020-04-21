# M.A.C
Module, Actor, Channel is a design pattern for creating flexible systems which can quickly adapt to changes in the system or requirements. It is inspired by working mechanism of cells in biology.

## Concept:
Just like in a busy city having multiple offices each office doing a specific function(Eg:Utilities, Transport etc), Citizens navigate through them to accompilsh a job or task, each citizen has its own map or instructions to navigate through the city and complete the given task. The point here being each citizen(Actor) is self navigated or self orchrastated.

## Example:
Each Module has a very specific function, each command in the system is actor and actor or commands navigate to different modules using channels.

Assume we have to build a calculator but a restfull one we would have the following parts in M.A.C Design system

| Part  |  Type | Remarks  |
|---|---|---|
| MathEngine  | Module  | Responsible to add,subtract,divide and multiply 2 numbers.  |
| RestEngine  | Module  | Responsible to convert REST calls into command which can be processed and convert results back into restful form.  |
| Instructions  | Actor  | Responsible to interpret the commands and use them to achive the result via Math Engine.   |
| Que | Channel | Responsible for passing data between the modules. |

Completed code example here [Example 1](examples/RESTfulAddition)