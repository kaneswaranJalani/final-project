function Signup(){
    return(
        <>
        <form action="/signup" method="POST">
        <h2>Create an Account</h2>
        
        <div>
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" required/>
        </div>
        
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required/>
        </div>
        
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required/>
        </div>
        
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required/>
        </div>
        
        <div>
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required/>
        </div>
        
        <button type="submit">Sign Up</button>
        
        <div>
            Already have an account? <a href="/login">Log in</a>
        </div>
    </form>

        </>
    )
}
export default Signup