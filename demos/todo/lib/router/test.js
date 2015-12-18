var routes = [
  [
    _ => typeof _ !== 'number' && typeof _ !== 'string',
    _ => console.error(
      'only strings and numbers; %s is not allowed.', typeof _ )
  ],
  [
    _ => typeof _ === 'string',
    _ => console.log('\'%s\' is a string', _)
  ],
  [
    _ => _%2,
    _ => console.log('%s is odd', _)
  ],
  [
    _ => !(_%2),
    _ => console.log('%s is even', _)
  ],
  [
    _ => !(_.length),
    _ => console.log('%s has length', _)
  ]
]

var router = createRouter(routes);
router.send(0);
router.send();
router.send(1);
router.send('two');
router.send(3);
router.send({});
router.send(3);
router.send('end');





//export default createRouter
