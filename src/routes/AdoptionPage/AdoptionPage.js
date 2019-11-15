import React from 'react';
import './AdoptionPage.css';

class AdoptionPage extends React.Component {
    render(){
        return (
            <section className='adoptions-page'>
                <div className='users-wrapper'>
                <h2>User Line:</h2>
                    {/* render users */}
                </div>

                <div className='animals'>
                <h2>Up Next to Adopt: </h2>
                <div className='animal-wrapper'>
                    {/* render animals */}
                </div>
                </div>

                <div className='recently-adopted'>
                    <h2>Recently Adopted: </h2>
                <div className='adopted-wrapper'>
                    {/* render recently adopted*/}
                </div>
                </div>
            </section>
        );
    };
}
export default AdoptionPage;


