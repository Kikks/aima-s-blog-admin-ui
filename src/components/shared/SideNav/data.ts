export const links = [
  {
    url: '/dashboard',
    icon: 'majesticons:home-simple-line',
    title: 'Dashboard',
  },
  {
    foreign: true,
    url: process.env.NEXT_PUBLIC_CLIENT_APP || '',
    icon: 'ri:layout-line',
    title: 'View site',
  },
];

export const links2 = [
  {
    url: '/posts',
    icon: 'fluent:note-edit-24-regular',
    title: 'Posts',
    actionButton: {
      icon: 'material-symbols:add',
      url: '/posts/new',
    },
    children: [
      {
        icon: 'material-symbols:draft-orders-outline',
        url: '/posts/?type=drafts',
        title: 'Drafts',
      },
      {
        icon: 'ph:telegram-logo',
        url: '/posts/?type=published',
        title: 'Published',
      },
      {
        icon: 'ic:twotone-star-outline',
        url: '/posts/featured',
        title: 'Featured',
      },
    ],
  },
  {
    url: '/categories',
    icon: 'mdi:category-outline',
    title: 'Categories',
  },
  {
    url: '/members',
    icon: 'ph:users-bold',
    title: 'Members',
  },
];
