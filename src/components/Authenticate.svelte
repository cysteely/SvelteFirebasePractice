<div class="authContainer">
    <form type="submit">
        <h1>Login</h1>
        <label>
            <input type="email" placeholder="Email" required />
        </label>
        <label>
            <input type="password" placeholder="Password" required />
        </label>
        <label>
            <input type="password" placeholder="Confirm Password" required />
        </label>
        <button type="button"> Submit</button>
    </form>
</div>

<style> 
    .authContainer {
        margin: auto;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        text-align: center;
        max-width: 100%;
        width: 400px;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 0 auto;
    }

    form input{
        width: 100%;
        border: none;
        background: transparent;
        padding: 8px 14px;
        color: white;
    }

    h1{
        font-size: 4em;
        text-align: left;
        text-shadow: 4px 4px 4px rgba(93, 203, 247, 0.5);
        padding: 0px 30px 30px 0px;
    }

    form label {
        position: relative;
        border: 3px solid rgb(108, 184, 255);
        border-radius: 5px;
    }


    form button {
        background: white;
        color: navy;
        border: none;
        padding: 10px 10px;
        width: 30%;
        cursor: pointer;
        /* margin: 0 auto; */
        border-radius: 5px;
    }

    form button:hover {
        background: rgb(150, 191, 252);
    }
</style>