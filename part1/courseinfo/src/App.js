const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
        )}
    </>
  );
}

const Part = ({part}) => {
  return(
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
}

const Total = ({parts}) => {
  const reducer = (sum, part) => sum + part.exercises;
  const total = parts.reduce(reducer, 0);

  return (
    <>
      <p>
        Number of Exercises {total}
      </p>
    </>
  );
}


function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  };
  

  return (
    <Course course={course} />
  );
}

export default App;
