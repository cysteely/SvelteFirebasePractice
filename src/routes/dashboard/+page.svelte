<script>
    import { db } from "../../lib/firebase/firebase";
    import { authHandlers, authStore } from "../../store/store";
    import { getDoc, doc, setDoc } from "firebase/firestore";
    import TodoItem from "../../components/TodoItem.svelte";


    let todoList = [""];
    let currTodo = "";
    let error = false;
    
    authStore.subscribe((curr) => {
        todoList = curr.data.todos;
    });

    function addTodo() {
        error=false;
        if (!currTodo){
            error = true;
            return;
        }
        todoList= [...todoList, currTodo];
        currTodo="";
    }

    function editTodo(index) {
        let newTodoList = [...todoList].filter((val,i)=> {
            return i!=index;
        });
        currTodo = todoList[index];
        todoList = newTodoList;
    }

    function removeTodo(index){
        let newTodoList = todoList.filter((val,i)=> {
            return i!==index
        });
        todoList = newTodoList;
    }

    async function saveTodos() {
        try {
            const userRef = doc(db, "user", $authStore.user.uid);
            await setDoc(
                userRef,
                {
                    todos: todoList,
                },
                { merge: true }
            );
        } catch (err) {
            console.log("There was an error saving your information");
        }
    }
</script>


{#if !$authStore.loading }
    <div class="mainContainer">
        <div class="headerContainer">
            <h1>Todo List</h1>
            <div class="headerBtns">
                <button on:click={saveTodos}>
                    <i class="fa-regular fa-floppy-disk"></i>
                    <p>Save</p>
                </button>
                <button on:click={authHandlers.logout}>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <p>Log Out</p>
                </button>
            </div>
        </div>
        <main>
            {#if todoList.length ===0}
                <p>You have nothing to do!</p>
            {/if}

            {#each todoList as todo, index}
                <TodoItem {todo} {index} {removeTodo} {editTodo} />
            {/each}
        </main>
        <div class={"enterTodo " + (error ? "errorBorder" : "")}>
            <input bind:value={currTodo} type="text" placeholder="Enter todo" />
            <button on:click={addTodo}>ADD</button>
        </div>
    </div>
{/if}

<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        gap: 24px;
        padding: 24px;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
    }

    .headerContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerContainer button {
        background: #003c5b;
        color: white;
        padding: 10px 18px;
        border: none;
        border-radius: 4px;
        font-weight: 700px;
        font-size: 1rem;
        display: flex;
        align-items: cneter;
        gap: 10px;
    }

    h1{
        font-size: 4em;

    }

    .headerBtns {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .todo{
        font-size: 1.5em;
        border-left: 1px solid cyan;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }


    .enterTodo {
        position: absolute;
        bottom: 0px;
        display: flex;
        align-items: stretch;
        width: 70%;
        border-radius: 5px;
        overflow: hidden;
    }
    
    .errorBorder {
        border-color: coral !important;
    }

    .enterTodo input {
        background: transparent;
        padding: 14px;
        color: white;
        flex: 1;
    }

    .enterTodo input:focus {
        outline: none;
    }

    .enterTodo button {
        padding: 0 14px;
        background: #003c5b;
        border: none;
        color: cyan;
        font-weight:600;
        cursor: pointer;
    }

    .enterTodo button:hover{
        border: black;
        border-radius: 3rem;
    }


</style>



