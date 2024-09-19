// import { useEffect, useState } from "react";
// import axios from "axios"; // Import axios

// function Form() {

//   const [name, setName] = useState('');
//   const [datetime, setDatetime] = useState('');
//   const [description, setDescription] = useState('');
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     getTransactions().then(setTransactions).catch(console.error); // Handle potential errors
//   }, []);

//   async function getTransactions() {
//     const url = `${import.meta.env.VITE_API_URL}/transactions`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       return [];
//     }
//   }

//   function addNewTransaction(ev) {
//     ev.preventDefault();
//     const url = `${import.meta.env.VITE_API_URL}/transaction`;
//     const price = parseFloat(name.split(' ')[0]); // Convert price to a number

//     axios.post(url, {
//       price,
//       name: name.substring(price.toString().length).trim(), // Correctly split name
//       description,
//       datetime: new Date(datetime).toISOString(), // Format datetime
//     })
//       .then(response => {
//         setName('');
//         setDatetime('');
//         setDescription('');
//         console.log('Result:', response.data);
//         getTransactions().then(setTransactions); // Refresh transactions list
//       })
//       .catch(error => {
//         console.error('Error adding new transaction:', error.response?.data || error.message);
//       });
//   }

//   let balance = 0;
//   for (const transaction of transactions) {
//     balance = balance + transaction.price;
//   }


//   balance = balance.toFixed(2);
//   const fraction = balance.split('.')[1];
//   balance = balance.split('.')[0];


//   return (
//     <>
//       <div>
//         <main>
//           <h1>₹{balance}<span>{fraction}</span></h1>
//           <form onSubmit={addNewTransaction}>
//             <div className='basic'>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={ev => setName(ev.target.value)}
//                 placeholder='+/- Amount | Title'
//               />
//               <input
//                 value={datetime}
//                 onChange={ev => setDatetime(ev.target.value)}
//                 type='datetime-local'
//               />
//             </div>

//             <div className='description'>
//               <input
//                 type='text'
//                 value={description}
//                 onChange={ev => setDescription(ev.target.value)}
//                 placeholder={'description'}
//               />
//             </div>
//             <button type='submit'>Add new transaction</button>
//           </form>
//           <div className='transactions'>
//             {transactions.length > 0 && transactions.map(transaction =>
//               <div className='transaction' key={transaction._id}>
//                 <div className='left'>
//                   <div className='name'>{transaction.name}</div>
//                   <div className='description'>{transaction.description}</div>
//                 </div>
//                 <div className='right'>
//                   <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>
//                     {transaction.price}
//                   </div>
//                   <div className='datetime'>{new Date(transaction.datetime).toLocaleString()}</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

// export default Form;



















import { useEffect, useState } from "react";
import axios from "axios"; // Import axios

function Form() {

  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions).catch(console.error); // Handle potential errors
  }, []);

  async function getTransactions() {
    const url = `${import.meta.env.VITE_API_URL}/transactions`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = `${import.meta.env.VITE_API_URL}/transaction`;
    const price = parseFloat(name.split(' ')[0]); // Convert price to a number

    axios.post(url, {
      price,
      name: name.substring(price.toString().length).trim(), // Correctly split name
      description,
      datetime: new Date(datetime).toISOString(), // Format datetime
    })
      .then(response => {
        setName('');
        setDatetime('');
        setDescription('');
        console.log('Result:', response.data);
        getTransactions().then(setTransactions); // Refresh transactions list
      })
      .catch(error => {
        console.error('Error adding new transaction:', error.response?.data || error.message);
      });
  }

  function deleteTransaction(id) {
    const url = `${import.meta.env.VITE_API_URL}/transaction/${id}`;
    axios.delete(url)
      .then(response => {
        console.log('Result:', response.data);
        setTransactions(transactions.filter(transaction => transaction._id !== id)); // Update state
      })
      .catch(error => {
        console.error('Error deleting transaction:', error.response?.data || error.message);
      });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <>
      <div>
        <main>
          <h1>₹{balance}<span>{fraction}</span></h1>
          <form onSubmit={addNewTransaction}>
            <div className='basic'>
              <input
                type="text"
                value={name}
                onChange={ev => setName(ev.target.value)}
                placeholder='+/- Amount | Title'
              />
              <input
                value={datetime}
                onChange={ev => setDatetime(ev.target.value)}
                type='datetime-local'
              />
            </div>

            <div className='description'>
              <input
                type='text'
                value={description}
                onChange={ev => setDescription(ev.target.value)}
                placeholder={'description'}
              />
            </div>
            <button type='submit'>Add new transaction</button>
          </form>
          <div className='transactions'>
            {transactions.length > 0 && transactions.map(transaction =>
              <div className='transaction' key={transaction._id}>
                <div className='left'>
                  <div className='name'>{transaction.name}</div>
                  <div className='description'>{transaction.description}</div>
                </div>
                <div className='right'>
                  <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>
                    {transaction.price}
                  </div>
                  <div className='datetime'>{new Date(transaction.datetime).toLocaleString()}</div>
                  <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Form;
