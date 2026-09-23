import React from 'react';
import './Home.css';
import { Link } from 'react-router';

function Home() {
  const profiles = [
    {
      id: '101',
      name: 'Arjun Kumar',
      role: 'Web Developer',
      image: 'https://i.pravatar.cc/150?img=12',
      cover:
        'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80',
      bio: 'Love coding, technology and building new things.'
    },
    {
      id: '102',
      name: 'Priya Sharma',
      role: 'UI/UX Designer',
      image: 'https://i.pravatar.cc/150?img=47',
      cover:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      bio: 'Designer who enjoys creating simple and beautiful experiences.'
    },
    {
      id: 'danish',
      name: 'Danish',
      role: 'Full Stack Developer',
      image: 'https://i.pravatar.cc/150?img=11',
      cover:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      bio: 'Learning, building and exploring new technologies.'
    },{
      id: '103',
      name: 'Arjun Kumar',
      role: 'Web Developer',
      image: 'https://i.pravatar.cc/150?img=12',
      cover:
        'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80',
      bio: 'Love coding, technology and building new things.'
    }
  ];

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">WELCOME TO OUR STORE</p>

          <h1>
            Shop. Connect.
            <br />
            Discover.
          </h1>

          <p className="hero-text">
            Explore products, discover new people and connect
            with your community.
          </p>

          <Link to="/products" className="shop-btn">
            Start Shopping
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80"
            alt="Shopping"
          />
        </div>
      </section>

      {/* Profiles */}
      <section className="profiles-section">

        <div className="section-heading">
          <h2>People you may know</h2>
          <p>Meet some of our community members</p>
        </div>

        <div className="profile-grid">

          {profiles.map((profile) => (
            <div className="profile-card" key={profile.id}>

              <img
                className="cover-image"
                src={profile.cover}
                alt="Cover"
              />

              <div className="profile-content">

                <img
                  className="profile-image"
                  src={profile.image}
                  alt={profile.name}
                />

                <h3>{profile.name}</h3>

                <p className="role">{profile.role}</p>

                <p className="bio">{profile.bio}</p>

                <Link
                  to={`/profile/${profile.id}`}
                  className="profile-btn"
                >
                  View Profile
                </Link>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;