# M.A.C
Module, Actor, Channel is a design pattern for creating flexible systems which can quickly adapt to changes in the system or requirements. It is inspired by working mechanism of cells/viruses in biology domain.

## Concept:
Just like in a busy city having multiple offices each office doing a specific function(Eg:Utilities, Transport etc), Citizens navigate through them to accompilsh a job or task, each citizen has its own map or instructions to navigate through the city and complete the given task. The point here being each citizen(Actor) is self navigated or self orchrastated.

In a MAC design system each command/action/event is a actor which has its own instructions on how it will reach different modules to complete a given task. Following example should help for understanding the concept better.(The fun starts when the requirement changes in release 2)

## Example:
This is a made of examples and may have little to no resemblance to real world, the idea behind this example is to feel how requirements escalte quickly to a complete new dimension for which system designer may have never even thought of.

**Release 1** : A banking customer asks us to make a calculator which can do basic math computation, should be offered as a service.

So we build a restful API for different Math Operations and expose them. solution will contain following parts

| Part  |  Type | Remarks  |
|---|---|---|
| MathEngine  | Module  | Responsible to add,subtract,divide and multiply 2 numbers.  |
| RestEngine  | Module  | Responsible to convert REST calls into command which can be processed and convert results back into restful form.  |
| Instructions  | Actor  | Responsible to interpret the commands and use them to achive the result via Math Engine.   |
| Que | Channel | Responsible for passing data between the modules. |

Completed code implementation here [Example 1](examples/RESTfulAddition)

**Release 2** : The customer is impressed by our calculator offering as its the most acurate and reliable service compared to our competitors, he has now asked us to build a Bill tally service on top of the existing calculator service which will verify if the total amount calculated by some system tallies with the total amount we calculate since we are the best and most accurate in the calculator business, also again it has to be service offering(a.k.a Restful Service).

Most of us may think we can built restful facade for Bill Tally service which internally uses the Calculator Rest Facade built earlier this is one way to built it, but in MAC we would built a module which creates an actor with Bill tally instructions which is then used to achieve the desired results, parts shown below will be added to the existing solution.

| Part  |  Type | Remarks  |
|---|---|---|
| BillCalculationEngine  | Module  | Responsible to add,subtract,divide and multiply 2 numbers.  |
| Instructions  | Actor  | Instructions on using the MathEngine to validate the bill total amount.  |
| BillRestEngine | Module | Facade for Bill related RESt API's. |

Completed code implementation here [Example 2](examples/RESTfulAddition)

I realised I need a more bass ass real usecase which basically absues release 1 requirements.

## API

**MacModule** Functions
1. ``name()`` : Its a abstract function which needs to be overridden by inheriting class should return string which is name of the module.
2. ``templateResolver(templateId)`` : Its a abstract function needs to be overriden, should return instructions[] for the given template to create actor.