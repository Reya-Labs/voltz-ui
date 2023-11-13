module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (
          path.node.callee.name === 'require' &&
          path.node.arguments[0].type === 'StringLiteral' &&
          path.node.arguments[0].value === '@emotion/styled' &&
          !path.node.alreadyTransformed
        ) {
          const newRequire = t.callExpression(t.identifier('require'), [
            t.stringLiteral('@emotion/styled'),
          ]);
          newRequire.alreadyTransformed = true;
          const newExpression = t.memberExpression(newRequire, t.identifier('default'));
          path.replaceWith(newExpression);
        }
      },
    },
  };
};
