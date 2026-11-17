// =====================================================================
// EDIT THIS FILE to change the words, links and lists on the site.
// It is plain data, so you do not need to touch any React code.
// =====================================================================

export const profile = {
  name: 'Christopher Malhas',
  affiliation: 'University of Oklahoma',
  tagline: 'I study how star-forming galaxies push gas out into the space around them.',
  bio: [
    'I work on galactic outflows, the winds that carry gas and metals out of a galaxy when stars form and die. My focus is extremely low-mass star-forming galaxies, where these winds are strong compared with the galaxy itself.',
    'I measure outflows from ultraviolet absorption lines and Lyman-alpha emission, including in gravitationally lensed galaxies such as the Sunburst Arc.',
  ],
  email: 'christopher.m.malhas-1@ou.edu',
  github: 'https://github.com/YOUR-USERNAME',
  cvFile: 'CV_Malhas_2026.pdf',
};

// Big numbers shown on the home page. Update these when your counts change.
export const homeStats = [
  { value: '49', label: 'galaxies in the outflow sample' },
  { value: '5', label: 'ions measured per galaxy' },
  { value: '1', label: 'paper submitted' },
  { value: '2', label: 'papers in preparation' },
];

export const currentWork = [
  'Modeling the outflow structure of the Sunburst Arc.',
  'Testing what drives outflows in extremely low-mass star-forming galaxies.',
];

export const publications = [
  {
    title: 'Dissecting the subgalactic outflow structure of the sunburst arc',
    authors: 'M. Riley Owens, Christopher M. Malhas, Paul Smith, Jessica G. Burns, John Chisholm, Jane R. Rigby, Matthew B. Bayliss',
    status: 'In prep',
    venue: 'In preparation, 2026',
  },
  {
    title: 'New Constraints on the Drivers of Outflows Using Extremely Low-mass Star-forming Galaxies',
    authors: 'Christopher M. Malhas, John Chisholm, Christy Tremonti, Claus Leitherer',
    status: 'In prep',
    venue: 'In preparation, 2026',
  },
  {
    title: 'Connecting Lyman-alpha and ionizing photon escape in the Sunburst Arc',
    authors: 'M. Riley Owens, Keunho J. Kim, Matthew B. Bayliss, et al., including Christopher M. Malhas',
    status: 'Submitted',
    venue: 'Submitted to ApJ, October 2024',
  },
  {
    title: 'Connecting Lyman-alpha and ionizing photon escape at cosmic noon with a strongly lensed galaxy arc',
    authors: 'M. Riley Owens, Keunho J. Kim, Matthew B. Bayliss, et al., including Christopher M. Malhas',
    status: 'Abstract',
    venue: 'AAS meeting, January 2024',
  },
  {
    title: 'Revealing the Galactic Outflow Properties of Extremely Low-Mass Star-Forming Galaxies',
    authors: 'Christopher M. Malhas, John Chisholm, Christy Tremonti, Claus Leitherer',
    status: 'Abstract',
    venue: 'AAS meeting, January 2023',
  },
  {
    title: 'New Constraints on the outflow properties of extremely low-mass star-forming galaxies',
    authors: 'Christopher M. Malhas, John Chisholm, Christy Tremonti, Claus Leitherer',
    status: 'Abstract',
    venue: 'TIDES Undergraduate Research Forum, 2022',
  },
  {
    title: 'Studying Features of the Hβ line profile Produced by The Z-Machine',
    authors: 'Christopher M. Malhas, Michael Montgomery',
    status: 'Poster',
    venue: 'Freshman Research Initiative, Fall 2020',
  },
  {
    title: 'Using Aperture Photometry of LCOGT Data to Search for Variable Stars',
    authors: 'Christopher M. Malhas, Michael Montgomery',
    status: 'Poster',
    venue: 'Freshman Research Initiative, Spring 2020',
  },
];

export const experience = [
  { role: 'Graduate student, astronomy', place: 'University of Oklahoma', dates: 'Aug 2025 to present' },
  { role: 'Research scientist', place: 'University of Texas at Austin', dates: 'May 2023 to present' },
  { role: 'Undergraduate student representative', place: 'UT Austin Astronomy Department', dates: 'Fall 2022 to Spring 2023' },
  { role: 'Summer undergraduate researcher', place: 'University of Texas at Austin', dates: 'Summer 2021' },
  { role: 'High school teacher', place: 'Melissa High School', dates: 'Aug 2024 to Aug 2025' },
];

export const education = [
  { role: 'Graduate studies in astronomy', place: 'University of Oklahoma', dates: '2025 to present' },
  { role: 'B.S. in Astronomy, GPA 3.3', place: 'University of Texas at Austin', dates: '2019 to 2022' },
];

export const honors = [
  'UT Austin Summer Research Funding Fellowship, 2021',
  'National Speech and Debate Association Academic All-American, 2019',
  'Texas Interscholastic League Foundation speech and debate scholarship, 2019',
];

export const projects = [
  {
    name: 'Outflow measurement code',
    language: 'Python',
    blurb: 'Measures absorption-line velocities and equivalent widths from galaxy spectra, with uncertainties.',
    link: 'https://github.com/YOUR-USERNAME/YOUR-REPO',
  },
  {
    name: 'LCOGT aperture photometry',
    language: 'Python',
    blurb: 'Aperture photometry on Las Cumbres Observatory Global Telescope images, used to search for variable stars.',
    link: 'https://github.com/YOUR-USERNAME/YOUR-REPO',
  },
];

export const exampleCode = {
  title: 'Example: velocity measurements from an absorption profile',
  note: 'A generic example to show the format. Replace it with a function from your own pipeline.',
  code: `import numpy as np

def absorption_velocities(v, tau):
    """Centroid and 5th/95th-percentile velocities of an absorption profile.

    v   : velocity grid in km/s
    tau : optical depth on the same grid (negative values are clipped to 0)
    """
    tau = np.clip(tau, 0, None)
    total = tau.sum()
    v_cen = (v * tau).sum() / total
    cdf = np.cumsum(tau) / total
    v05 = np.interp(0.05, cdf, v)
    v95 = np.interp(0.95, cdf, v)
    return v_cen, v05, v95`,
};
