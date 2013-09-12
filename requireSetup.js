requirejs.config({
    baseUrl: "/spec/", // Default from data-main path in index.html
    paths: {
        SetupUnitTests: 'SetupUnitTests',
        UnitTestHelper: 'UnitTestHelper'
    },
    shim: {
        'SetupUnitTests': {
            exports: 'SetupUnitTests'
        },
        'UnitTestHelper': {
            exports: 'UnitTestHelper'
        }
    }
});