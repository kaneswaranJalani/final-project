function Login(){
    return(
        <>
          <form action="/login" method="POST">
        <h2>User Login</h2>
        
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required/>
        </div>
        
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required/>
        </div>
        
        <div>
            <input type="checkbox" id="remember" name="remember"/>
            <label for="remember">Remember me</label>
        </div>
        
        <button type="submit">Login</button>
        
        <div>
            <a href="/forgot-password">Forgot password?</a>
        </div>
    </form>
        </>
    )
}
export default Login