import { useEffect, useState } from "react";


const Root = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])


    const handleOnSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = { name, email }
        
        
        console.log(user);
        fetch("http://localhost:5000/users", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const newUsers = [...users, data];
                setUsers(newUsers)

                form.reset();
            })
    }
    return (
        <div>
            <h2 className='text-2xl my-5 font-bold text-center'>Users Management System</h2>
            <h2 className='text-2xl my-5 font-bold text-center'>Users: {users.length}</h2>
            <div className="flex flex-col items-center justify-center mb-8">
                <form onSubmit={handleOnSubmit} className="space-y-3">
                    <label>Name</label> <br />
                    <input type="text" className="border px-3 py-2" name="name" placeholder="your name" /> <br />
                    <label>Email</label> <br />
                    <input type="email" className="border px-3 py-2" name="email" placeholder="your email" /> <br />
                    <input className="bg-green-500 px-7 py-2 rounded cursor-pointer" type="submit" value="Add User" /> <br />
                </form>
            </div>

            <div className="flex flex-col items-center justify-center">
                {
                    users.map(user => <p key={user.id}>
                        {user.id}: {user.name} : {user.email}
                    </p>)
                }
            </div>
        </div>
    );
};

export default Root;