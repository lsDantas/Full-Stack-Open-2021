const Course = ({course}) => {
  return (
    <div>
      <CourseHeader course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

const Header = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
}

const CourseHeader = (props) => {
  return (
    <>
      <h2>{props.course.name}</h2>
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
        <b>Total of {total} exercises</b>
      </p>
    </>
  );
}


function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <>
    <Header title="Web development curriculum" />
    {courses.map(course => 
      <Course key={course.id} course={course} />
    )}
    </>
  );
}

export default App;
