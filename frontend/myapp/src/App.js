// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import CategoryMaster from './components/CategoryMaster';
// import ProductMaster from './components/ProductMaster';

// const App = () => {
//     return (
//         <Router>
//             <div>
//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/categories">Category Master</Link>
//                         </li>
//                         <li>
//                             <Link to="/products">Product Master</Link>
//                         </li>
//                     </ul>
//                 </nav>

//                 <Routes>
//                     <Route path="/categories" element={<CategoryMaster />} />
//                     <Route path="/products" element={<ProductMaster />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryMaster from './components/CategoryMaster';
import ProductMaster from './components/ProductMaster';

const App = () => {
    return (
        <Router>
            {/* Include Navbar here */}
            <Navbar />

            {/* Main content area */}
            <div className="container mt-4">
                <Routes>
                    <Route path="/categories" element={<CategoryMaster />} />
                    <Route path="/products" element={<ProductMaster />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
