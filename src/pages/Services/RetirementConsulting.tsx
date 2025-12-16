import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const sections = [
	{
		title: 'Governance for Retirement Trusts',
		description: [
			'Trust Deed Execution as per the Income Tax Act 1961 and Employee Provident fund & Miscellaneous Provisions Act, 1952',
			'Trustee Board Constitution and Resolutions ensuring appropriate employee representations, voting and change as per Trustee rules',
			'Setting trustee Meeting Agenda, Frequency, Quorum Minutes of the meeting and record keeping including MIS',
			'Perform Periodic Compliance and Audits to report to Trustee Board and Management',
			'Fund Manager Review, Compliance on investment Guidelines, portfolio Tracking and analysis including Asset Liability Management',
			'Design Framework of Trust Benefits, Transfer/withdrawal including for international workers in compliance with the regulatory mandates',
		],
	},
	{
		title: 'Retirement Income Adequacy Calculation',
		description: [
			'Will I have enough money to retire?',
			'When can I retire?',
			'What will my standard of living be like?',
			'The thought-provoking Universal Actuaries Analysis and tools answer these questions and inspire strategic retirement plan design and communication solutions that enable and motivate your employees to take action for their future.',
		],
	},
	{
		title: 'Employee Help',
		description: [
			'Analysis on future needs vs expected income',
			'Surplus/shortfall modelling for retirement adequacy',
		],
	},
	{
		title: 'Employer Help',
		description: [
			'Financial wellness session for employees',
			'Understanding employees’ readiness',
		],
	},
];

const RetirementConsulting = () => {
	return (
		<div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24">
			{/* Hero Section */}
			<section className="py-20 bg-gradient-to-br from-accent-50 to-slate-50 dark:from-dark-card dark:to-dark-bg">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto"
					>
						<h1 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
							Retirement{' '}
							<span className="text-accent-600 dark:text-accent-500">
								Consulting
							</span>
						</h1>
						<p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
							Delivering innovative solutions for retirement governance and income
							adequacy.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Sections */}
			<section className="py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="space-y-12">
						{sections.map((section, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="bg-white dark:bg-dark-card rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all group"
							>
								<h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
									{section.title}
								</h3>
								<ul className="space-y-2 md:space-y-3">
									{section.description.map((item, i) => (
										<li key={i} className="flex items-start gap-2 md:gap-3">
											<CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-accent-600 dark:text-accent-500" />
											<span className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
												{item}
											</span>
										</li>
									))}
								</ul>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export { RetirementConsulting };
export default RetirementConsulting;