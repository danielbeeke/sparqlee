import { TypeURL } from '../../../lib/util/Consts';
import { int, numeric } from '../../util/Aliases';
import { Notation } from '../../util/TestTable';
import type { ITestTableConfigBase } from '../../util/utils';
import { runTestTable } from '../../util/utils';

describe('evaluation of \'+\' like', () => {
  const baseConfig: ITestTableConfigBase = {
    arity: 2,
    operation: '+',
    aliases: numeric,
    notation: Notation.Infix,
  };
  runTestTable({
    ...baseConfig,
    testTable: `
      0i 0i = 0i
      0i 1i = 1i
      1i 2i = 3i
    
      -0f -0f =  0f
      -0f -1f = -1f
      -1f -2f = -3f
    
       2i -1f = 1f
    
      -12f  INF =  INF
      -INF -12f = -INF
      -INF -INF = -INF
       INF  INF =  INF
       INF -INF =  NaN
    
      NaN    NaN    = NaN
      NaN    anyNum = NaN
      anyNum NaN    = NaN

      0i 0d = 0d
      0i 0f = 0f
      0i "0"^^xsd:double = "0.0E0"^^xsd:double
      0d 0i = 0d
      0d 0f = 0f
      0d "0"^^xsd:double = "0.0E0"^^xsd:double
      0f 0i = 0f
      0f 0d = 0f
      0f "0"^^xsd:double = "0.0E0"^^xsd:double
      "0"^^xsd:double 0i = "0.0E0"^^xsd:double
      "0"^^xsd:double 0d = "0.0E0"^^xsd:double
      "0"^^xsd:double 0f = "0.0E0"^^xsd:double
    `,
  });
  runTestTable({
    ...baseConfig,
    config: {
      type: 'sync',
      config: {
        getSuperType: unknownType => TypeURL.XSD_INTEGER,
        enableExtendedXsdTypes: true,
      },
    },
    testTable: `
      "2"^^example:int "3"^^example:int = ${int('5')}
    `,
  });
});
