import sourcemaps from 'rollup-plugin-sourcemaps';
import license from 'rollup-plugin-license';
var Visualizer = require('rollup-plugin-visualizer');

const path = require('path');

export default {
    output: {
        format: 'es',
        sourcemap: true
    },
    plugins: [
        Visualizer({
            filename: './dist/stats.html'
        }),
        sourcemaps(),
        license({
            sourcemap: true,
            banner: {
                content: {
                    file: path.join(__dirname, 'license-banner.txt'),
                    encoding: 'utf-8',
                }
            }
        })
    ],
    onwarn: () => { return }
}
