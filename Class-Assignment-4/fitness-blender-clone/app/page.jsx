import React from "react";

export default function Home() {
  return (
    <div>
      {/* Top Announcement Bar */}
      <div id="announcement" className="announcement gray">
        <div className="inner">
          <p>
            Week 3 is here!{" "}
            <a href="https://www.fitnessblender.com/plans/fb30-30-day-team-program-a-mix-of-strength-cardio-and-mobility-training-types-30-minute-workouts-for?utm_source=BANNER">
              Jump in anytime—add the program to your calendar and start moving today!
            </a>
          </p>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="fb-menu" id="header">
        <div className="container header-container">
          <h1 className="brand">
            <a href="/">Fitness Blender</a>
          </h1>
          <nav className="menu-main">
            <ul>
              <li className="has-dropdown workouts">
                <a href="#" className="anchor"><span>Workouts</span></a>
              </li>
              <li className="has-dropdown programs">
                <a href="#" className="anchor"><span>Programs</span></a>
              </li>
              <li className="has-dropdown healthy-living">
                <a href="#" className="anchor"><span>Healthy Living</span></a>
              </li>
              <li className="has-dropdown community">
                <a href="#" className="anchor"><span>Community</span></a>
              </li>
              <li className="has-dropdown about">
                <a href="#" className="anchor"><span>About</span></a>
              </li>
              <li className="store">
                <a href="#" className="anchor"><span>Store</span></a>
              </li>
              <li className="membership">
                <a href="#" className="anchor"><span className="plus">Membership</span></a>
              </li>
            </ul>
          </nav>
          <div className="menu-controls">
            <div className="menu-login-button">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero and Content Section */}
      <main id="content" className="no-pad">
        <section className="content-group unit-group">
          {/* Main Hero Card */}
          <div className="group -edge -flex -center">
            <div className="unit-block full bg-teal-aqua">
              <div className="unit-content">
                <div className="unit-message light">
                  <h2 className="unit-title">
                    Feel Great.<br /> Body and Mind.
                  </h2>
                  <p className="unit-body hero">
                    Choose from hundreds of workouts, healthy recipes, relaxing
                    meditations, and expert articles, for a whole body and mind
                    approach to feeling great.
                  </p>
                  <div className="unit-cta">
                    <a className="btn -white call-out -no-case" href="#">
                      Join Now
                    </a>
                  </div>
                </div>
                <div className="unit-image">
                  <img
                    src="https://cloudfront.fitnessblender.com/assets/img/homepage/team-2024-1440.png"
                    alt="Fitness Blender team"
                    width="1440"
                    height="1440"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grid Cards */}
          <div className="group -edge -flex -center">
            {/* Trainer Series Block */}
            <div className="unit-block half bg-sand">
              <div className="unit-content">
                <div className="unit-message dark">
                  <h2 className="unit-title">Trainer Series</h2>
                  <p className="unit-body">Exercise with your favorite trainer in our new Trainer Series programs.</p>
                  <div className="unit-cta">
                    <a className="btn call-out -no-case -dark" href="#">View Series</a>
                  </div>
                </div>
                <div className="unit-image bleed-bottom">
                  <img
                    src="https://cloudfront.fitnessblender.com/assets/img/homepage/trainer-series-1440.png"
                    alt="Trainer Series"
                  />
                </div>
              </div>
            </div>

            {/* Plus Membership Block */}
            <div className="unit-block half bg-lavender-teal">
              <div className="unit-content">
                <div className="unit-message light">
                  <h2 className="unit-title">Earn a Free Plus Membership</h2>
                  <p className="unit-body">Share your referral code and every sign up earns rewards to put toward your membership.</p>
                  <div className="unit-cta">
                    <a className="btn call-out -no-case -white" href="#">Learn About Rewards</a>
                  </div>
                </div>
                <div className="unit-image bleed-bottom">
                  <img
                    src="https://cloudfront.fitnessblender.com/assets/img/about/reward-1440.png"
                    alt="Referral rewards"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}