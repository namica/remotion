import React from 'react';
import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {DotGrid} from './HelloWorld/DotGrid';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';

export const HelloWorld: React.FC = () => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 50, videoConfig.durationInFrames - 30],
		[1, 0]
	);
	const transitionStart = 50;

	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<DotGrid />
			<div style={{opacity}}>
				<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
					<Logo transitionStart={transitionStart} />
				</Sequence>
				<Sequence from={transitionStart + 10} durationInFrames={Infinity}>
					<Title />
				</Sequence>
				<Sequence from={transitionStart + 100} durationInFrames={Infinity}>
					<Subtitle />
				</Sequence>
			</div>
		</div>
	);
};